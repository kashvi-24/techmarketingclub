// Each scenario keeps the audience, benefit and objection connected.
export const scenarios=[
 {product:'a password manager',audience:'freelancers',benefit:'stop losing access to client accounts',objection:'switching feels like a weekend of admin'},
 {product:'a local-first notes app',audience:'researchers',benefit:'find the thought they wrote down six months ago',objection:'their notes are already scattered across five tools'},
 {product:'an accessible website builder',audience:'independent shop owners',benefit:'welcome customers who use assistive technology',objection:'accessibility sounds expensive and technical'},
 {product:'a privacy-first analytics tool',audience:'startup marketers',benefit:'learn what works without tracking people everywhere',objection:'they think more data always means better decisions'},
 {product:'a calendar that protects focus time',audience:'remote team leads',benefit:'get an uninterrupted afternoon back',objection:'saying no to meetings feels antisocial'},
 {product:'a no-code automation tool',audience:'community organisers',benefit:'spend less time copying names between spreadsheets',objection:'they are afraid an automation will break silently'},
 {product:'a transparent AI writing assistant',audience:'skeptical editors',benefit:'check sources without losing their own voice',objection:'they have seen too many confident made-up answers'},
 {product:'a repair marketplace',audience:'people with a broken laptop',benefit:'keep a familiar machine for another year',objection:'buying something new seems easier than finding a repairer'},
 {product:'a collaborative prototyping tool',audience:'first-time founders',benefit:'test an idea before spending months building it',objection:'showing unfinished work feels embarrassing'},
 {product:'an open-source budgeting app',audience:'people with irregular income',benefit:'plan for a quiet month',objection:'most money advice assumes a predictable salary'},
 {product:'a language-learning app',audience:'people moving abroad',benefit:'feel comfortable in an everyday conversation',objection:'a perfect streak has never helped them order lunch'},
 {product:'a developer documentation tool',audience:'small engineering teams',benefit:'answer recurring questions before they interrupt someone',objection:'documentation goes stale the moment it is written'}
];
type Scenario=typeof scenarios[number];
export const challenges:((s:Scenario)=>string)[]=[
 s=>`Everyone says ${s.product} is useful. ${s.audience} still aren't switching because ${s.objection}. Write the one billboard that changes their mind. Seven words max.`,
 s=>`Give ${s.audience} a reason to try ${s.product} without asking them to sign up. Design a free, useful experience that helps them ${s.benefit}. What happens in the first 30 seconds?`,
 s=>`Your launch budget for ${s.product} is $200. Get ten ${s.audience} into the same room. What would you host that they'd invite a friend to?`,
 s=>`Make a 20-second silent film for ${s.product}. Show what it feels like to ${s.benefit}. No interface shots. Sketch the opening and closing frames.`,
 s=>`A customer says, “${s.objection}.” Reply with a three-email story for ${s.product}. Each email must give ${s.audience} something useful, even if they never buy.`,
 s=>`Build a tiny street-level stunt for ${s.product}. Turn the promise to ${s.benefit} into something a passerby can actually experience. No QR code as the whole idea.`,
 s=>`You're retiring the phrase “save time” from the ${s.product} homepage. Write a new headline for ${s.audience}, then describe one piece of proof you'd put beneath it.`,
 s=>`Find an unlikely partner for ${s.product}: a library, a café, or a hobby club. What could you make together that helps ${s.audience} ${s.benefit}?`,
 s=>`Pitch a recurring series for ${s.product} that ${s.audience} would watch voluntarily. Give it a name and write the first three episode titles. Don't make the product the main character.`,
 s=>`The category is full of polished product demos. Make a deliberately low-tech demo of ${s.product} using only things on a kitchen table. Explain one idea clearly.`,
 s=>`Design a referral for ${s.product} that helps both people ${s.benefit}. No discounts, points or leaderboards. What gets shared, and why is it worth sending?`,
 s=>`Interview three ${s.audience} who decided against ${s.product}. Write the three questions you'd ask, then one campaign hypothesis to test. Start with “${s.objection}.”`
];
export function nextBrief(previous:{scenario:number;challenge:number}|null,seen:number[]=[]):{id:number;scenario:number;challenge:number;text:string}{
 const options:number[]=[];
 for(let c=0;c<challenges.length;c++)for(let s=0;s<scenarios.length;s++)if(c!==previous?.challenge&&s!==previous?.scenario&&!seen.includes(c*scenarios.length+s))options.push(c*scenarios.length+s);
 if(!options.length)return nextBrief(previous,[]);
 const id=options[Math.floor(Math.random()*options.length)];const scenario=id%scenarios.length,challenge=Math.floor(id/scenarios.length);
 return {id,scenario,challenge,text:challenges[challenge](scenarios[scenario])};
}
