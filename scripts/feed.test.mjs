import {test} from 'node:test';import assert from 'node:assert/strict';import {parseFeed,validId} from './feed.mjs';
const entry=(id,title='A &amp; B')=>`<entry><yt:videoId>${id}</yt:videoId><title>${title}</title><published>2026-10-01T10:00:00Z</published></entry>`;
test('parses one entry and escaped title',()=>{const v=parseFeed(`<feed>${entry('elCIE6WSWWg')}</feed>`);assert.equal(v[0].title,'A & B');assert.equal(v[0].thumbnail,'https://i.ytimg.com/vi/elCIE6WSWWg/hqdefault.jpg')});
test('rejects malformed ids and accepts empty feed',()=>{assert.deepEqual(parseFeed(`<feed>${entry('bad/id')}</feed>`),[]);assert.deepEqual(parseFeed('<feed/>'),[]);assert.equal(validId('../bad'),false)});
test('handles multiple entries; rejects error page',()=>{assert.equal(parseFeed(`<feed>${entry('elCIE6WSWWg')}${entry('sJcusoeuUEI')}</feed>`).length,2);assert.throws(()=>parseFeed('<html>error</html>'))});
