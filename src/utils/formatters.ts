export const formatName=(v:string)=>v.replace(/([a-z])([A-Z])/g,"$1 $2").replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase());
export const displayValue=(v:unknown)=>v==null?"-":Array.isArray(v)?v.join(", "):typeof v==="object"?JSON.stringify(v):String(v);
export const errorMessage=(e:unknown)=>e instanceof Error?e.message:"Unexpected error occurred.";
export const metric=(m:Record<string,unknown>,k:string,d:unknown)=>m[k]===null||m[k]===undefined||m[k]===""?d:m[k];