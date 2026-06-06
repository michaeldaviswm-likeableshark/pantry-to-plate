import { useState, useRef } from 'react'

const rust="#c8502a",sage="#6b8c6e",ink="#1c1410",ink2="#5c4a38",ink3="#9c8a78",
      cream="#faf6f0",warm="#f5ede0",paper="#fffdf9",gold="#d4a535"

const s = {
  app:{background:cream,minHeight:"100vh",fontFamily:"'DM Sans',sans-serif",color:ink,
       backgroundImage:"radial-gradient(ellipse at 0% 0%,rgba(200,80,42,.06) 0%,transparent 50%),radial-gradient(ellipse at 100% 100%,rgba(107,140,110,.08) 0%,transparent 50%)"},
  nav:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",
       borderBottom:"1px solid rgba(60,30,10,.08)",background:paper,position:"sticky",top:0,zIndex:100},
  logo:{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",fontWeight:900},
  navTabs:{display:"flex",gap:3},
  navTab:(a)=>({fontSize:"0.75rem",fontWeight:600,padding:"6px 12px",borderRadius:50,border:"none",
    background:a?ink:"transparent",color:a?cream:ink3,cursor:"pointer"}),
  badge:(pro)=>({fontSize:"0.62rem",fontWeight:600,background:pro?rust:gold,color:"#fff",padding:"4px 9px",borderRadius:50}),
  hero:{padding:"24px 18px 14px",maxWidth:600,margin:"0 auto"},
  card:{background:paper,borderRadius:16,border:"1px solid rgba(60,30,10,.08)",
        boxShadow:"0 2px 20px rgba(60,30,10,.08)",padding:18,maxWidth:600,margin:"0 auto 14px"},
  lbl:{fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.1em",color:ink3,textTransform:"uppercase",marginBottom:7},
  uploadZone:{border:"2px dashed rgba(60,30,10,.15)",borderRadius:12,padding:"22px 16px",
              textAlign:"center",cursor:"pointer",background:warm,transition:"all .2s"},
  uploadZoneActive:{border:"2px solid "+sage,background:"rgba(107,140,110,.06)"},
  previewImg:{width:"100%",maxHeight:200,objectFit:"cover",borderRadius:8,marginBottom:8},
  scanBtn:{width:"100%",padding:"11px",background:sage,color:"#fff",border:"none",borderRadius:8,
           fontFamily:"'DM Sans',sans-serif",fontSize:"0.85rem",fontWeight:600,cursor:"pointer",
           marginTop:10,boxShadow:"0 2px 10px rgba(107,140,110,.3)"},
  scanningRow:{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",
               background:"rgba(107,140,110,.08)",borderRadius:8,fontSize:"0.8rem",color:sage,fontWeight:600,marginTop:10},
  scannedBox:{padding:"10px 12px",background:"rgba(107,140,110,.08)",borderRadius:8,marginTop:8},
  divOr:{display:"flex",alignItems:"center",gap:10,margin:"14px 0",color:ink3,fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.1em"},
  inputRow:{display:"flex",gap:8,marginBottom:10},
  input:{flex:1,padding:"10px 12px",border:"1.5px solid rgba(60,30,10,.12)",borderRadius:8,
         fontFamily:"'DM Sans',sans-serif",fontSize:"0.85rem",background:cream,color:ink,outline:"none"},
  addBtn:{padding:"10px 14px",background:rust,color:"#fff",border:"none",borderRadius:8,
          fontFamily:"'DM Sans',sans-serif",fontSize:"0.85rem",fontWeight:600,cursor:"pointer"},
  chipsWrap:{display:"flex",flexWrap:"wrap",gap:6,minHeight:32,marginBottom:12},
  chip:{display:"flex",alignItems:"center",gap:4,background:warm,border:"1px solid rgba(60,30,10,.1)",
        borderRadius:50,padding:"4px 10px 4px 9px",fontSize:"0.76rem",fontWeight:500},
  chipX:{cursor:"pointer",color:ink3,fontSize:"0.85rem",background:"none",border:"none",padding:0},
  chipPhoto:{background:"rgba(107,140,110,.12)",border:"1px solid rgba(107,140,110,.25)",color:sage},
  prefsRow:{display:"flex",gap:7,flexWrap:"wrap",marginTop:6},
  prefChip:(a)=>({fontSize:"0.73rem",fontWeight:600,padding:"5px 11px",borderRadius:50,
    border:`1.5px solid ${a?sage:"rgba(60,30,10,.12)"}`,background:a?sage:"transparent",color:a?"#fff":ink2,cursor:"pointer"}),
  genBtn:(d)=>({width:"100%",maxWidth:560,display:"block",margin:"0 auto 20px",padding:15,
    background:d?ink3:rust,color:"#fff",border:"none",borderRadius:12,
    fontFamily:"'Playfair Display',serif",fontSize:"1rem",fontWeight:700,fontStyle:"italic",
    cursor:d?"not-allowed":"pointer",boxShadow:d?"none":"0 4px 20px rgba(200,80,42,.3)"}),
  loading:{textAlign:"center",padding:"36px 20px"},
  errorBox:{background:"rgba(200,80,42,.08)",border:"1px solid rgba(200,80,42,.2)",borderRadius:8,
            padding:"11px 15px",fontSize:"0.8rem",color:rust,maxWidth:560,margin:"0 auto 14px"},
  results:{maxWidth:600,margin:"0 auto",padding:"0 18px 40px"},
  rcard:{background:paper,borderRadius:16,border:"1px solid rgba(60,30,10,.07)",
         boxShadow:"0 2px 20px rgba(60,30,10,.08)",marginBottom:14,overflow:"hidden"},
  rcHdr:{padding:"16px 16px 10px",borderBottom:"1px solid rgba(60,30,10,.06)",cursor:"pointer"},
  tagRow:{display:"flex",gap:7,marginBottom:7,flexWrap:"wrap"},
  tag:(t)=>({fontSize:"0.61rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 8px",borderRadius:50,
    background:t==="cuisine"?"rgba(212,165,53,.15)":t==="time"?"rgba(107,140,110,.15)":"rgba(200,80,42,.1)",
    color:t==="cuisine"?gold:t==="time"?sage:rust}),
  rcTitle:{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",fontWeight:700,marginBottom:3},
  rcDesc:{fontSize:"0.8rem",color:ink2,lineHeight:1.5},
  expandRow:{padding:"7px 16px",fontSize:"0.7rem",color:ink3,fontWeight:600,display:"flex",justifyContent:"space-between",cursor:"pointer"},
  rcBody:{padding:"12px 16px"},
  secTitle:{fontSize:"0.61rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:rust,marginBottom:7,marginTop:10},
  ingList:{display:"flex",flexWrap:"wrap",gap:5},
  ingChip:(h)=>({fontSize:"0.74rem",padding:"3px 9px",borderRadius:50,fontWeight:500,
    background:h?"rgba(107,140,110,.15)":"rgba(200,80,42,.1)",color:h?sage:rust}),
  stepsList:{listStyle:"none"},
  stepItem:{display:"flex",gap:10,padding:"8px 0",fontSize:"0.82rem",lineHeight:1.55,color:ink2},
  stepNum:{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"0.95rem",color:rust,minWidth:18,paddingTop:1},
  actRow:{display:"flex",gap:7,marginTop:10,paddingTop:10,borderTop:"1px solid rgba(60,30,10,.06)"},
  actBtn:(p)=>({flex:1,padding:8,borderRadius:7,border:`1.5px solid ${p?rust:"rgba(60,30,10,.1)"}`,
    background:p?rust:"transparent",color:p?"#fff":ink2,fontFamily:"'DM Sans',sans-serif",fontSize:"0.76rem",fontWeight:600,cursor:"pointer"}),
  savedEmpty:{textAlign:"center",padding:"50px 20px",color:ink3},
  paywall:{maxWidth:420,margin:"28px auto",padding:"0 18px",textAlign:"center"},
  planCard:(f)=>({border:`2px solid ${f?rust:"rgba(60,30,10,.1)"}`,borderRadius:14,padding:16,marginBottom:10,
    textAlign:"left",background:paper,position:"relative",boxShadow:f?"0 0 0 4px rgba(200,80,42,.08)":"none"}),
  subBtn:{width:"100%",padding:13,background:rust,color:"#fff",border:"none",borderRadius:12,
          fontFamily:"'Playfair Display',serif",fontSize:"0.95rem",fontWeight:700,fontStyle:"italic",cursor:"pointer",
          boxShadow:"0 4px 20px rgba(200,80,42,.3)",marginTop:3},
}

const PREFS=["🌿 Vegetarian","🌱 Vegan","🌾 Gluten-free","🥛 Dairy-free","⚡ Quick (≤20 min)","🍳 Breakfast"]
const LOAD_MSGS=["Scanning your ingredients…","Searching global cuisines…","Balancing flavours…","Writing instructions…","Almost ready…"]

export default function App() {
  const [tab,setTab]=useState("generate")
  const [ingredients,setIngredients]=useState([])
  const [photoIngredients,setPhotoIngredients]=useState([])
  const [inputVal,setInputVal]=useState("")
  const [prefs,setPrefs]=useState([])
  const [loading,setLoading]=useState(false)
  const [scanning,setScanning]=useState(false)
  const [loadMsg,setLoadMsg]=useState(LOAD_MSGS[0])
  const [recipes,setRecipes]=useState([])
  const [saved,setSaved]=useState(()=>{try{return JSON.parse(localStorage.getItem("ptp_saved")||"[]")}catch(e){return []}})
  const [savedTitles,setSavedTitles]=useState(()=>new Set((()=>{try{return JSON.parse(localStorage.getItem("ptp_saved")||"[]").map(r=>r.title)}catch(e){return []}})()))
  const [error,setError]=useState("")
  const [expanded,setExpanded]=useState({})
  const [photoPreview,setPhotoPreview]=useState(null)
  const [photoB64,setPhotoB64]=useState(null)
  const [photoMime,setPhotoMime]=useState("image/jpeg")
  const [isPro,setIsPro]=useState(()=>localStorage.getItem("ptp_pro")==="true")
  const fileRef=useRef()

  const allIngredients=[...ingredients,...photoIngredients]

  const handleFile=(e)=>{
    const file=e.target.files[0]; if(!file) return
    let mime=file.type||"image/jpeg"
    if(mime.includes("heic")||mime.includes("heif")) mime="image/jpeg"
    const reader=new FileReader()
    reader.onload=ev=>{
      const b64=ev.target.result.split(",")[1]
      if(b64.startsWith("iVBOR")) mime="image/png"
      setPhotoMime(mime)
      setPhotoB64(b64)
      setPhotoPreview(ev.target.result)
      setPhotoIngredients([])
    }
    reader.readAsDataURL(file)
  }

  const scanPhoto=async()=>{
    if(!photoB64){setError("No photo loaded.");return}
    setScanning(true); setError("")
    try {
      const res=await fetch("/api/recipes",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          ingredients:[],
          preferences:[],
          photoBase64:photoB64,
          photoMime,
          scanOnly:true
        })
      })
      const data=await res.json()
      if(data.error) throw new Error(data.error)
      if(data.ingredients) setPhotoIngredients(data.ingredients.map(i=>String(i).toLowerCase()))
      else if(data.recipes) {
        // fallback: extract ingredients_have from first recipe
        const found=data.recipes[0]?.ingredients_have||[]
        setPhotoIngredients(found.map(i=>String(i).toLowerCase()))
      }
    } catch(e){
      setError("Scan failed: "+e.message)
    } finally { setScanning(false) }
  }

  const addIngredient=()=>{
    const val=inputVal.trim(); if(!val) return
    const items=val.split(/,|;/).map(s=>s.trim()).filter(Boolean)
    setIngredients(prev=>{const next=[...prev];items.forEach(i=>{if(!next.includes(i.toLowerCase()))next.push(i.toLowerCase())});return next})
    setInputVal("")
  }
  const removeIng=(ing)=>setIngredients(prev=>prev.filter(i=>i!==ing))
  const removePhotoIng=(ing)=>setPhotoIngredients(prev=>prev.filter(i=>i!==ing))
  const togglePref=(p)=>setPrefs(prev=>prev.includes(p)?prev.filter(x=>x!==p):[...prev,p])

  const generate=async()=>{
    const current=[...ingredients,...photoIngredients]
    if(current.length===0){setError("Please add ingredients or scan a photo first.");return}
    setError(""); setLoading(true); setRecipes([])
    let idx=0
    const t=setInterval(()=>{idx=(idx+1)%LOAD_MSGS.length;setLoadMsg(LOAD_MSGS[idx])},1800)
    try {
      const res=await fetch("/api/recipes",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          ingredients:current,
          preferences:prefs,
          photoBase64:photoB64,
          photoMime
        })
      })
      const data=await res.json()
      if(data.error) throw new Error(data.error)
      if(!data.recipes||data.recipes.length===0) throw new Error("No recipes returned")
      setRecipes(data.recipes)
    } catch(e){
      setError("Error: "+e.message)
    } finally { clearInterval(t); setLoading(false) }
  }

  const saveRecipe=(r)=>{
    const next=[...saved,{...r,savedAt:new Date().toLocaleDateString()}]
    setSaved(next); setSavedTitles(new Set([...savedTitles,r.title]))
    try{localStorage.setItem("ptp_saved",JSON.stringify(next))}catch(e){}
  }
  const deleteSaved=(i)=>{
    const next=saved.filter((_,j)=>j!==i)
    setSaved(next); setSavedTitles(new Set(next.map(r=>r.title)))
    try{localStorage.setItem("ptp_saved",JSON.stringify(next))}catch(e){}
  }

  const RecipeCard=({r,cardId,isSaved=false,onDelete})=>{
    const isExp=expanded[cardId]
    const alreadySaved=savedTitles.has(r.title)
    return(
      <div style={s.rcard}>
        <div style={s.rcHdr} onClick={()=>setExpanded(p=>({...p,[cardId]:!p[cardId]}))}>
          <div style={s.tagRow}>
            <span style={s.tag("cuisine")}>{r.cuisine}</span>
            <span style={s.tag("time")}>⏱ {r.time}</span>
            <span style={s.tag("diff")}>{r.difficulty}</span>
          </div>
          <div style={s.rcTitle}>{r.title}</div>
          <div style={s.rcDesc}>{r.description}</div>
        </div>
        <div style={s.expandRow} onClick={()=>setExpanded(p=>({...p,[cardId]:!p[cardId]}))}>
          <span>{isExp?"Hide recipe":"View recipe"}</span>
          <span style={{transition:"transform .2s",display:"inline-block",transform:isExp?"rotate(180deg)":"none"}}>▼</span>
        </div>
        {isExp&&(
          <div style={s.rcBody}>
            {r.ingredients_have?.length>0&&<>
              <div style={{...s.secTitle,marginTop:0}}>Ingredients you have</div>
              <div style={{...s.ingList,marginBottom:8}}>{r.ingredients_have.map((g,j)=><span key={j} style={s.ingChip(true)}>✓ {g}</span>)}</div>
            </>}
            {r.ingredients_need?.length>0&&<>
              <div style={s.secTitle}>You may also need</div>
              <div style={{...s.ingList,marginBottom:8}}>{r.ingredients_need.map((g,j)=><span key={j} style={s.ingChip(false)}>+ {g}</span>)}</div>
            </>}
            <div style={s.secTitle}>Instructions</div>
            <ol style={s.stepsList}>
              {(r.steps||[]).map((step,j)=>(
                <li key={j} style={{...s.stepItem,borderBottom:j<r.steps.length-1?"1px solid rgba(60,30,10,.05)":"none"}}>
                  <span style={s.stepNum}>{j+1}</span><span>{step}</span>
                </li>
              ))}
            </ol>
            <div style={s.actRow}>
              {isSaved
                ?<button style={s.actBtn(false)} onClick={onDelete}>🗑 Remove</button>
                :<button style={s.actBtn(true)} onClick={()=>!alreadySaved&&saveRecipe(r)} disabled={alreadySaved}>
                  {alreadySaved?"✓ Saved":"🔖 Save Recipe"}
                </button>
              }
            </div>
          </div>
        )}
      </div>
    )
  }

  return(
    <div style={s.app}>
      <style>{`
        @keyframes wobble{from{transform:rotate(-8deg) translateY(0)}to{transform:rotate(8deg) translateY(-6px)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        input:focus{border-color:#c8502a !important;}
      `}</style>

      <nav style={s.nav}>
        <div style={s.logo}>Pantry<span style={{color:rust,fontStyle:"italic"}}>to</span>Plate</div>
        <div style={s.navTabs}>
          {["generate","saved","pro"].map(t=>(
            <button key={t} style={s.navTab(tab===t)} onClick={()=>setTab(t)}>
              {t==="generate"?"Generate":t==="saved"?"Saved":"Pro ✦"}
            </button>
          ))}
        </div>
        <div style={s.badge(isPro)}>{isPro?"PRO ✦":"FREE"}</div>
      </nav>

      {tab==="generate"&&(
        <>
          <div style={s.hero}>
            <div style={{fontSize:"0.65rem",letterSpacing:"0.18em",color:rust,fontWeight:600,textTransform:"uppercase",marginBottom:6}}>
              ✦ AI-Powered Recipe Generator
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.7rem,6vw,2.4rem)",fontWeight:900,lineHeight:1.1,marginBottom:6}}>
              What's in your <em style={{color:rust,fontStyle:"italic"}}>kitchen?</em>
            </h2>
            <p style={{fontSize:"0.85rem",color:ink2,lineHeight:1.6}}>
              Snap your fridge or type ingredients — get recipes you can make right now.
            </p>
          </div>

          <div style={s.card}>
            <div style={s.lbl}>📸 Scan Your Fridge</div>
            <div
              style={{...s.uploadZone,...(photoPreview?s.uploadZoneActive:{})}}
              onClick={()=>fileRef.current.click()}
            >
              <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFile}/>
              {photoPreview?(
                <>
                  <img src={photoPreview} style={s.previewImg} alt="fridge"/>
                  <div style={{fontSize:"0.76rem",color:sage,fontWeight:600}}>📷 Tap to change photo</div>
                </>
              ):(
                <>
                  <div style={{fontSize:"2rem",marginBottom:6}}>📸</div>
                  <div style={{fontSize:"0.85rem",color:ink2,fontWeight:500}}>Tap to photograph your fridge or pantry</div>
                  <div style={{fontSize:"0.7rem",color:ink3,marginTop:3}}>JPG, PNG, HEIC supported</div>
                </>
              )}
            </div>

            {photoPreview&&!scanning&&photoIngredients.length===0&&(
              <button style={s.scanBtn} onClick={scanPhoto}>
                🔍 Scan Ingredients from Photo
              </button>
            )}

            {scanning&&(
              <div style={s.scanningRow}>
                <span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>🔄</span>
                Scanning your fridge…
              </div>
            )}

            {photoIngredients.length>0&&(
              <div style={s.scannedBox}>
                <div style={{fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.12em",color:sage,textTransform:"uppercase",marginBottom:6}}>
                  ✓ Found in your photo — tap × to remove
                </div>
                <div style={s.chipsWrap}>
                  {photoIngredients.map((ing,i)=>(
                    <div key={i} style={{...s.chip,...s.chipPhoto}}>
                      <span>{ing}</span>
                      <button style={s.chipX} onClick={()=>removePhotoIng(ing)}>×</button>
                    </div>
                  ))}
                </div>
                <button
                  style={{padding:"6px 12px",background:"transparent",border:"1px solid rgba(107,140,110,.3)",
                          borderRadius:6,fontSize:"0.72rem",color:sage,cursor:"pointer",fontWeight:600}}
                  onClick={()=>{setPhotoPreview(null);setPhotoB64(null);setPhotoIngredients([])}}>
                  🗑 Clear photo
                </button>
              </div>
            )}

            <div style={s.divOr}>
              <span style={{flex:1,height:1,background:"rgba(60,30,10,.1)"}}/>
              OR ADD MANUALLY
              <span style={{flex:1,height:1,background:"rgba(60,30,10,.1)"}}/>
            </div>

            <div style={s.inputRow}>
              <input
                style={s.input}
                value={inputVal}
                placeholder="e.g. chicken, garlic, lemon…"
                onChange={e=>setInputVal(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&addIngredient()}
              />
              <button style={s.addBtn} onClick={addIngredient}>+ Add</button>
            </div>
            <div style={s.chipsWrap}>
              {ingredients.map((ing,i)=>(
                <div key={i} style={s.chip}>
                  <span>{ing}</span>
                  <button style={s.chipX} onClick={()=>removeIng(ing)}>×</button>
                </div>
              ))}
              {allIngredients.length===0&&(
                <span style={{fontSize:"0.76rem",color:ink3,padding:"3px 0"}}>
                  No ingredients yet — scan a photo or type above
                </span>
              )}
            </div>

            <div style={s.lbl}>Dietary Preferences</div>
            <div style={s.prefsRow}>
              {PREFS.map(p=>(
                <button key={p} style={s.prefChip(prefs.includes(p))} onClick={()=>togglePref(p)}>{p}</button>
              ))}
            </div>
          </div>

          {error&&<div style={{...s.errorBox,maxWidth:560,marginLeft:"auto",marginRight:"auto"}}>⚠️ {error}</div>}

          <button
            style={s.genBtn(loading||allIngredients.length===0)}
            onClick={generate}
            disabled={loading||allIngredients.length===0}
          >
            {loading?"🍳 Finding recipes…":"✦ Find Recipes from My Pantry"}
          </button>

          {loading&&(
            <div style={s.loading}>
              <span style={{fontSize:"2.5rem",display:"inline-block",animation:"wobble .8s ease-in-out infinite alternate"}}>🍳</span>
              <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.05rem",color:ink2,marginTop:10}}>
                Cooking up ideas…
              </div>
              <div style={{fontSize:"0.76rem",color:ink3,marginTop:4}}>{loadMsg}</div>
            </div>
          )}

          {recipes.length>0&&!loading&&(
            <div style={s.results}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:14}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.15rem",fontWeight:700}}>Your Recipes</div>
                <span style={{fontSize:"0.73rem",color:ink3}}>{recipes.length} found</span>
              </div>
              {recipes.map((r,i)=><RecipeCard key={i} r={r} cardId={"g"+i}/>)}
            </div>
          )}
        </>
      )}

      {tab==="saved"&&(
        <div style={{maxWidth:600,margin:"0 auto",padding:"22px 18px 40px"}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",fontWeight:900,marginBottom:18}}>
            Your Recipe Book
          </h2>
          {saved.length===0
            ?<div style={s.savedEmpty}>
              <div style={{fontSize:"2.2rem",marginBottom:10}}>📖</div>
              <p style={{fontSize:"0.85rem",lineHeight:1.6}}>No saved recipes yet.<br/>Generate and tap Save to build your cookbook.</p>
            </div>
            :saved.map((r,i)=><RecipeCard key={i} r={r} cardId={"s"+i} isSaved onDelete={()=>deleteSaved(i)}/>)
          }
        </div>
      )}

      {tab==="pro"&&(
        <div style={s.paywall}>
          <div style={{fontSize:"2.6rem",marginBottom:14}}>👨‍🍳</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.6rem",fontWeight:900,marginBottom:7}}>
            Unlock Pro Chef Mode
          </h2>
          <p style={{fontSize:"0.85rem",color:ink2,lineHeight:1.6,marginBottom:20}}>
            Unlimited AI recipes, photo scanning, meal planning and shopping lists — less than a coffee a month.
          </p>
          <div style={s.planCard(true)}>
            <div style={{position:"absolute",top:-10,right:14,background:rust,color:"#fff",fontSize:"0.58rem",
                         fontWeight:700,letterSpacing:"0.1em",padding:"3px 9px",borderRadius:50}}>MOST POPULAR</div>
            <div style={{fontWeight:700,marginBottom:2}}>Monthly Pro</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",fontWeight:900,color:rust}}>
              $3.99 <span style={{fontSize:"0.75rem",fontFamily:"'DM Sans',sans-serif",fontWeight:500,color:ink3}}>/ month</span>
            </div>
            <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:4}}>
              {["Unlimited AI recipe generation","Real-time photo ingredient scanning","Save unlimited recipes",
                "Weekly meal plan generator","Shopping list export","Family sharing (up to 5)"].map(p=>(
                <div key={p} style={{fontSize:"0.76rem",color:ink2,display:"flex",gap:5}}>
                  <span style={{color:sage,fontWeight:700}}>✓</span>{p}
                </div>
              ))}
            </div>
          </div>
          <div style={s.planCard(false)}>
            <div style={{fontWeight:700,marginBottom:2}}>Annual Pro</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",fontWeight:900,color:rust}}>
              $29.99 <span style={{fontSize:"0.75rem",fontFamily:"'DM Sans',sans-serif",fontWeight:500,color:ink3}}>/ year · Save 37%</span>
            </div>
          </div>
         onClick={()=>startCheckout('monthly')}>
            Start 7-Day Free Trial →
          </button>
          <div style={{fontSize:"0.66rem",color:ink3,marginTop:9,lineHeight:1.5}}>
            Cancel anytime. No charge during trial.
          </div>
        </div>
      )}
    </div>
  )
}
