export default async function handler(req, res){
  if(req.method!=="POST"){ res.status(405).json({error:"Method Not Allowed"}); return; }
  const b = req.body || {};
  if(((b._honeypot)||"").trim()!==""){ return res.status(200).json({ok:true}); }
  const emailOk = (v)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v||"");
  if(!b.name || !emailOk(b.email) || !b.message || !b.consent){
    return res.status(400).json({error:"Champs invalides ou manquants"});
  }
  // TODO: brancher Resend ou autre SMTP ici
  return res.status(200).json({ok:true, simulated:true});
}
