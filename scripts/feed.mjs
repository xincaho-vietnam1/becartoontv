import {XMLParser} from 'fast-xml-parser';
export const validId=id=>typeof id==='string'&&/^[\w-]{11}$/.test(id);
export function parseFeed(xml){
 if(!xml.includes('<feed'))throw Error('Not a YouTube Atom feed');
 const parsed=new XMLParser({ignoreAttributes:false}).parse(xml);
 const entries=parsed.feed?.entry;
 if(!entries)return [];
 return (Array.isArray(entries)?entries:[entries]).map(e=>({id:String(e['yt:videoId']||''),title:String(e.title||''),publishedAt:String(e.published||'')})).filter(v=>validId(v.id)&&v.title&&Number.isFinite(Date.parse(v.publishedAt))).map(v=>({...v,thumbnail:`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}));
}
