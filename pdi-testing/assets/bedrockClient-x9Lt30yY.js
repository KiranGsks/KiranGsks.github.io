import{t as e}from"./inspectionContract-DxD7VCPe.js";var t=`pdi-ai-settings`,n={awsRegion:``,awsAccessKeyId:``,awsSecretAccessKey:``,awsSessionToken:``,modelId:``};function r(){try{let e=localStorage.getItem(t);return e?{...n,...JSON.parse(e)}:{...n}}catch{return{...n}}}function i(e){localStorage.setItem(t,JSON.stringify(e))}function a(){localStorage.removeItem(t)}function o(){let e=r();return!!(e.awsRegion&&e.awsAccessKeyId&&e.awsSecretAccessKey&&e.modelId)}function s(e,t=`standard`){return`You are a used vehicle buying assistant helping a consumer inspect a ${e.type} before purchase in India. Given the vehicle details, return a structured JSON inspection checklist tailored to this specific vehicle.

Vehicle Details:
- Type: ${e.type}
- Year: ${e.year}
- Make: ${e.make}
- Model: ${e.model}
- Variant: ${e.variant}
${e.fuelType?`- Fuel Type: ${e.fuelType}`:``}
${e.transmission?`- Transmission: ${e.transmission}`:``}
${e.engineCC?`- Engine: ${e.engineCC}cc`:``}
${e.registration?`- Registration: ${e.registration}`:``}

Inspection Track: ${t}
Track Description: ${{quick:`5-10 critical items only — the absolute must-checks that reveal deal-breakers`,standard:`20-30 items covering important mechanical, cosmetic, and safety checks`,deep:`40-60 exhaustive items including niche vehicle-specific checks, minor cosmetic items, and all electronics`}[t]}

Generate a checklist appropriate for a BUYER inspecting this vehicle. Consider:
1. Known issues specific to this make/model/year
2. Features expected at this variant level
3. Common fraud indicators for this vehicle segment
4. Age-appropriate wear items (older cars need different checks than newer ones)
5. Fuel-type specific checks
6. Transmission-specific checks

Return ONLY a valid JSON object (no markdown, no code fences) with this exact structure:

{
  "vehicleSummary": "Brief description of what to expect from this vehicle at this age/variant",
  "categories": [
    {
      "id": "category_id",
      "label": "Category Name",
      "items": [
        {
          "id": "unique_item_id",
          "label": "Human-readable check label (jargon-free)",
          "category": "category_id",
          "description": "What to look for and how to check it — written for a novice buyer",
          "checkType": "toggle|confirm|measure|select",
          "expectedState": "What a good result looks like",
          "redFlagIf": "What indicates a problem"
        }
      ]
    }
  ],
  "knownIssues": ["Known problems specific to this model/year that the buyer should be aware of"],
  "notes": ["General buying tips for this vehicle"]
}

checkType meanings:
- "toggle": Simple pass/fail check
- "confirm": Visual confirmation
- "measure": Requires checking a value
- "select": Choose from options (include "options" array)

Categories to consider (adapt based on vehicle type and track depth):
- Exterior (paint, panels, gaps, rust, lights, mirrors)
- Interior (seats, dashboard, controls, smell, wear)
- Engine & Mechanical (start quality, sounds, leaks, belts)
- Electrical (all switches, infotainment, sensors, cameras)
- Wheels & Tyres (tread, age, spare, alignment signs)
- Underbody (rust, leaks, damage, exhaust)
- Documents (RC, insurance, service history, NOC)
- Test Drive (steering, brakes, gearbox, suspension, noise)

For ${t} track: generate exactly ${t===`quick`?`5-10`:t===`standard`?`20-30`:`40-60`} items.
Prioritize the most critical items first within each category.
Write descriptions as if explaining to someone who has never inspected a car before.`}var c=`You are a knowledgeable used vehicle buying assistant for the Indian market. You have deep expertise in:
- All major car and bike brands sold in India
- Known issues and common problems for specific models and years
- Fair market pricing for used vehicles
- Common scam patterns in the Indian used car market
- Mechanical inspection techniques explained simply for non-experts

Always respond with valid JSON only — no markdown formatting, no explanations outside the JSON structure. Your responses directly drive a UI that renders inspection checklists for buyers. Write all descriptions in simple, jargon-free language that a first-time car buyer would understand.`;async function l(e,t){let n=await crypto.subtle.importKey(`raw`,e,{name:`HMAC`,hash:`SHA-256`},!1,[`sign`]);return crypto.subtle.sign(`HMAC`,n,new TextEncoder().encode(t))}async function u(e){let t=await crypto.subtle.digest(`SHA-256`,new TextEncoder().encode(e));return Array.from(new Uint8Array(t)).map(e=>e.toString(16).padStart(2,`0`)).join(``)}async function d(e,t,n,r){return l(await l(await l(await l(new TextEncoder().encode(`AWS4`+e).buffer,t),n),r),`aws4_request`)}function f(){let e=new Date().toISOString().replace(/[:-]|\.\d{3}/g,``);return{amzDate:e,dateStamp:e.slice(0,8)}}async function p(e,t,n,r,i,a,o){let s=`bedrock`,{amzDate:c,dateStamp:p}=f(),m=new URL(t);n[`x-amz-date`]=c,n.host=m.host;let h=Object.keys(n).sort((e,t)=>e.toLowerCase().localeCompare(t.toLowerCase())),g=h.map(e=>`${e.toLowerCase()}:${n[e].trim()}`).join(`
`)+`
`,_=h.map(e=>e.toLowerCase()).join(`;`),v=await u(r),y=[e,m.pathname,``,g,_,v].join(`
`),b=`${p}/${i}/${s}/aws4_request`,x=[`AWS4-HMAC-SHA256`,c,b,await u(y)].join(`
`),S=await l(await d(o,p,i,s),x),C=`AWS4-HMAC-SHA256 Credential=${a}/${b}, SignedHeaders=${_}, Signature=${Array.from(new Uint8Array(S)).map(e=>e.toString(16).padStart(2,`0`)).join(``)}`;return{...n,Authorization:C}}async function m(e,t=c){let n=r();if(!n.awsAccessKeyId||!n.awsSecretAccessKey)throw Error(`AWS credentials not configured. Please set them in Settings (gear icon).`);let i=n.awsRegion,a=n.modelId,o=`https://bedrock-runtime.${i}.amazonaws.com/model/${encodeURIComponent(a)}/invoke`,s=JSON.stringify({anthropic_version:`bedrock-2023-05-31`,max_tokens:4096,system:t,messages:[{role:`user`,content:e}]}),l={"Content-Type":`application/json`,Accept:`application/json`};n.awsSessionToken&&(l[`x-amz-security-token`]=n.awsSessionToken);let u=await p(`POST`,o,l,s,i,n.awsAccessKeyId,n.awsSecretAccessKey);delete u.host,delete u.Host;let d=await fetch(o,{method:`POST`,headers:u,body:s});if(!d.ok){let e=await d.text();throw Error(`Bedrock API error (${d.status}): ${e}`)}let f=await d.json();if(f.content&&Array.isArray(f.content))return f.content.filter(e=>e.type===`text`).map(e=>e.text).join(``);throw Error(`Unexpected response format from Bedrock`)}async function h(t,n=`standard`){let r=await m(s(t,n));try{let t=r.trim();return t.startsWith("```")&&(t=t.replace(/^```(?:json)?\n?/,``).replace(/\n?```$/,``)),e(JSON.parse(t))}catch{throw Error(`The generated guide was incomplete. You can keep using the essential guide or try again.`)}}export{r as a,o as i,m as n,i as o,a as r,h as t};