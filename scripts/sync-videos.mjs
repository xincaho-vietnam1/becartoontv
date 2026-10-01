import {readFile,writeFile} from 'node:fs/promises';
import {parseFeed,validId} from './feed.mjs';
const file=new URL('../public/data/videos.json',import.meta.url);
const channel='UCbX0grgNq9IQ2s545uGq_vg';
const apiKey=process.env.YOUTUBE_API_KEY;
async function getJson(url){const r=await fetch(url,{signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error(`YouTube request failed (${r.status})`);return r.json()}
async function fromApi(){
 const c=await getJson(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channel}&key=${encodeURIComponent(apiKey)}`);
 const playlist=c.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;if(!playlist)throw Error('No uploads playlist');
 const p=await getJson(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=15&playlistId=${playlist}&key=${encodeURIComponent(apiKey)}`);
 const ids=p.items.map(x=>x.contentDetails?.videoId).filter(validId);if(!ids.length)return [];
 const details=await getJson(`https://www.googleapis.com/youtube/v3/videos?part=snippet,status&id=${ids.join(',')}&key=${encodeURIComponent(apiKey)}`);
 return details.items.filter(v=>validId(v.id)&&v.status?.privacyStatus==='public'&&v.status?.embeddable).map(v=>({id:v.id,title:v.snippet.title,publishedAt:v.snippet.publishedAt,thumbnail:v.snippet.thumbnails?.high?.url||`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}));
}
try{
 let videos;
 if(apiKey)videos=await fromApi();else{const r=await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channel}`,{signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error(`Channel feed unavailable (${r.status})`);videos=parseFeed(await r.text())}
 // Optional editorial launch date: exclude older videos without deleting channel content.
 if(process.env.VIDEOS_PUBLISHED_AFTER)videos=videos.filter(v=>Date.parse(v.publishedAt)>=Date.parse(process.env.VIDEOS_PUBLISHED_AFTER));
 videos.sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt));
 await writeFile(file,JSON.stringify({updatedAt:new Date().toISOString(),source:apiKey?'youtube-data-api':'youtube-atom',videos},null,2)+'\n');
 console.log(`Updated ${videos.length} public videos.`);
}catch(e){
 // Preserve the last known snapshot during an outage; never log the secret or request URL.
 const cached=JSON.parse(await readFile(file,'utf8'));console.warn(`Video sync unavailable; keeping ${cached.videos?.length||0} cached entries. ${String(e.message).replaceAll(apiKey||'__NO_KEY__','[redacted]')}`);
 if(process.env.REQUIRE_VIDEO_SYNC==='true')process.exitCode=1;
}
