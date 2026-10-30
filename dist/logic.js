export const emptySchedule=()=>({version:1,studios:[],classes:[]});
export function secureURL(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:null}catch{return null}}
export function dateKey(d=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).format(d)}
export function addDays(key,n){const d=new Date(key+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)}
export function monday(key){const day=new Date(key+'T12:00:00Z').getUTCDay();return addDays(key,-((day+6)%7))}
export function validDate(key){return /^\d{4}-\d{2}-\d{2}$/.test(key)&&!isNaN(Date.parse(key+'T12:00Z'))&&new Date(key+'T12:00Z').toISOString().slice(0,10)===key}
export function validate(value){
 if(!value||value.version!==1||!Array.isArray(value.studios)||!Array.isArray(value.classes))throw Error('Choose a Moni version 1 schedule with studios and classes.');
 if(value.studios.length>500||value.classes.length>10000)throw Error('This schedule is too large.');
 const ids=new Set(),classIDs=new Set();
 const string=(v,max=1000)=>typeof v==='string'&&v.length<=max;
 for(const s of value.studios){if(!s||!string(s.id,100)||!s.id||ids.has(s.id)||!string(s.name,200)||!s.name.trim()||!string(s.address)||!string(s.area)||!string(s.bookingURL)||!string(s.colorHex,7))throw Error('A studio has missing, duplicate, or invalid details.');if(s.bookingURL&&!secureURL(s.bookingURL))throw Error('Studio booking links must use HTTPS without embedded credentials.');ids.add(s.id)}
 for(const c of value.classes){if(!c||!string(c.id,100)||!c.id||classIDs.has(c.id)||!ids.has(c.studioID)||!string(c.title,200)||!c.title.trim()||!string(c.date,10)||!validDate(c.date)||!([c.start].every(t=>typeof t==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(t)))||!(c.end===''||(typeof c.end==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(c.end)&&c.end>c.start))||!['format','level','notes','bookingURL'].every(k=>string(c[k]))||typeof c.cancelled!=='boolean')throw Error('A class has missing, duplicate, or invalid details.');if(c.bookingURL&&!secureURL(c.bookingURL))throw Error('Class booking links must use HTTPS without embedded credentials.');classIDs.add(c.id)}
 return {version:1,studios:value.studios,classes:value.classes};
}
export function sampleSchedule(today=dateKey()){
 const studios=[{id:'garden',name:'Garden House',address:'',area:'Sample studio',bookingURL:'',colorHex:'#a2af91'},{id:'form',name:'Form & Field',address:'',area:'Sample studio',bookingURL:'',colorHex:'#c68a75'},{id:'still',name:'Still Studio',address:'',area:'Sample studio',bookingURL:'',colorHex:'#c6b898'}];
 const names=['Mat Pilates Flow','Slow & Strong','Foundations','Evening Reset','Full Body Flow','Sunday Stretch'];
 const classes=Array.from({length:14},(_,i)=>({id:'sample-'+i,studioID:studios[i%3].id,title:names[i%names.length],date:addDays(today,Math.floor(i/2)),start:i%2?'18:30':'09:00',end:i%2?'19:15':'09:45',format:'Mat Pilates',level:i%3===2?'Beginner':'All levels',notes:'A fictional class to preview the Moni calendar. Actual studios, teaching times, and booking links are still to be confirmed.',bookingURL:'',cancelled:i===11}));return {version:1,studios,classes};
}
