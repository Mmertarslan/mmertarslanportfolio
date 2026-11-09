import React,{useState,useEffect,useRef} from "react";
import{createRoot}from"react-dom/client";
import{ArrowUpRight,Github,Linkedin,Mail,ChevronDown,X,ExternalLink,Database,Boxes,Code2,BrainCircuit}from"lucide-react";
import{projects}from"./data/projects";import"./style.css";import"./premium.css";
import{projectDetails}from"./data/project-details";
const cvUrl=`${import.meta.env.BASE_URL}Muhammet-Mert-Arslan-CV.pdf`;

function ImageViewer({images,index,onIndex,onClose}){
 const ref=useRef(null);
 useEffect(()=>{const dialog=ref.current;dialog.showModal();return()=>dialog.close()},[]);
 const move=step=>onIndex((index+step+images.length)%images.length);
 return <dialog ref={ref} className="image-viewer" aria-label="Proje görselleri" onCancel={e=>{e.preventDefault();onClose()}} onClick={e=>{if(e.target===e.currentTarget)onClose()}} onKeyDown={e=>{if(e.key==="Escape"){e.preventDefault();e.stopPropagation();onClose();}if(e.key==="ArrowRight"){e.preventDefault();move(1)}if(e.key==="ArrowLeft"){e.preventDefault();move(-1)}}}>
  <button className="x" autoFocus onClick={onClose} aria-label="Görseli kapat"><X/></button>
  <img src={images[index].src} alt={images[index].label}/>
  <div className="viewer-controls"><button onClick={()=>move(-1)} aria-label="Önceki görsel">←</button><p aria-live="polite">{images[index].label}<small>{index+1} / {images.length}</small></p><button onClick={()=>move(1)} aria-label="Sonraki görsel">→</button></div>
 </dialog>
}

const skills=[...new Set([
 "Yazılım Geliştirme","Web Teknolojileri","API Entegrasyonları","Veri Analizi",
 "Python","JavaScript","SQL","C","SQL Server","T-SQL","TensorFlow","OpenCV",
 "ColdFusion","Workcube ERP","SAP ABAP","İş Süreçleri","ArcGIS",
 ...projects.flatMap(p=>p.tech)
])];

function Visual({p}){
 return <div className={"visual "+p.tone+" "+p.type}>
  {p.coverImage&&<img className="cover-photo" src={p.coverImage} alt={p.coverLabel||p.title}/>}
  <div className="grain"></div><span className="visual-code">{p.no} / {p.type.toUpperCase()}</span>
  {!p.coverImage&&p.type==="farming"&&<div className="farm-ui"><small>SQL SERVER · T-SQL</small><h4>Dikey tarım.<br/><em>Veriyle takip.</em></h4><div className="farm-schema">{[["ÜRETİM HATTI","HatID · HatAdi"],["MARUL PARTİSİ","PartiID · HatID"],["SENSÖR VERİLERİ","pH · EC · Nem · Sıcaklık"],["UYARI KAYITLARI","PartiID · SensorVeriID"]].map(([label,fields])=><div key={label}><b>{label}</b><span>{fields}</span></div>)}</div><p>Üretim → Ölçüm → Gözlem → Uyarı</p></div>}
  {!p.coverImage&&p.type==="commerce"&&<div className="commerce-ui"><div className="phone"><div className="phonebar"></div><div className="leaf">✦</div><h4>Doğadan<br/>sofranıza.</h4><div className="mini-products"><i></i><i></i><i></i></div></div><div className="browser"><div className="dots">● ● ●</div><div className="shopnav">TARIM MARKET <span>Ürünler &nbsp; Hakkımızda &nbsp; Sepet</span></div><div className="hero-product"><div><small>YEREL ÜRETİM</small><strong>Tazeliği<br/>keşfet.</strong><button>Alışverişe başla →</button></div><div className="produce">✦</div></div></div></div>}
  {p.type==="erp"&&<div className="erp-ui"><div className="erp-nav"><b>W</b><span>Dashboard<br/>Finans<br/>Stok<br/>Satın Alma<br/>Raporlar</span></div><div className="erp-main"><small>OPERASYON ÖZETİ</small><h4>Kurumsal süreçler,<br/>tek merkezde.</h4><div className="erp-cards"><i>₺ 2.4M<small>Aylık işlem</small></i><i>1.248<small>Aktif kayıt</small></i><i>%94<small>Verimlilik</small></i></div><div className="erp-chart"><b></b><b></b><b></b><b></b><b></b><b></b></div></div></div>}
  {!p.coverImage&&p.type==="traffic"&&<div className="map-ui"><div className="roads r1"></div><div className="roads r2"></div><div className="roads r3"></div><div className="roads r4"></div><div className="map-panel"><small>CANLI ANALİZ</small><strong>2.046 km</strong><span>analiz edilen yol ağı</span><div><i></i> Akıcı &nbsp; <i></i> Yoğun</div></div></div>}
  {!p.coverImage&&p.type==="population"&&<div className="pop-ui">{Array.from({length:55}).map((_,i)=><i key={i} style={{"--h":(12+(i*37)%88)+"%"}}></i>)}<div className="pop-label">150 × 150 M GRID<br/><b>İSTANBUL</b></div></div>}
  {!p.coverImage&&p.type==="database"&&<div className="db-ui"><div className="db-code">SELECT&nbsp; *<br/>FROM <b>Warehouse</b><br/>JOIN Orders<br/>ON stock_id = id;</div><div className="schema">{["DEPO","SİPARİŞ","STOK","ÜRÜN"].map((x,i)=><div key={x} className={"table t"+i}><b>{x}</b><span>id &nbsp; PK<br/>data &nbsp; varchar<br/>status &nbsp; int</span></div>)}</div></div>}
  {!p.coverImage&&p.type==="ai"&&<div className="face-ui"><small>DERİN ÖĞRENME · BİLGİSAYARLI GÖRÜ</small><h4>Yüz ifadesi<br/><em>analizi.</em></h4><div className="face-preview" aria-hidden="true"><span>☺</span><i></i><i></i><i></i><i></i></div><p>CANLI KAMERA · CNN · 7 KATEGORİ</p></div>}
 </div>
}
function App(){
 const[active,setActive]=useState(null);const[scrolled,setScrolled]=useState(false);const[imageIndex,setImageIndex]=useState(null);
 useEffect(()=>setImageIndex(null),[active]);
 useEffect(()=>{const f=()=>{setScrolled(scrollY>30);const h=document.documentElement;h.style.setProperty("--p",(scrollY/Math.max(1,h.scrollHeight-innerHeight)).toFixed(4))};f();addEventListener("scroll",f,{passive:true});return()=>removeEventListener("scroll",f)},[]);
 useEffect(()=>{if(!active)return;const k=e=>{if(e.key==="Escape"&&!e.defaultPrevented&&!document.querySelector('.image-viewer[open]'))setActive(null)};addEventListener("keydown",k);document.body.style.overflow="hidden";return()=>{removeEventListener("keydown",k);document.body.style.overflow=""}},[active]);
 const activeImages=active?[...(active.coverImage?[{src:active.coverImage,label:active.coverLabel||active.title}]:[]),...(active.images||[])]:[];
 return <><header className={scrolled?"scrolled":""}><nav><a href="#projeler">Projeler</a><a href="#uzmanlik">Becerilerim</a><a href="#deneyim">Deneyimlerim</a><a href="#hakkimda">Hakkımda</a></nav><a className="availability" href="mailto:Mertars60@icloud.com"><i></i> İletişime geç</a></header>
 <main id="top">
  <section className="hero">
   <div className="hero-meta"><span>İSTANBUL / TÜRKİYE</span><span>PORTFÖY — 2026</span></div>
   <div className="hero-title"><div className="status"><i></i><span>YENİ FIRSATLARA<br/>AÇIK</span></div><h1>MUHAMMET<br/>MERT ARSLAN</h1></div>
   <div className="hero-bottom"><p>Bilgisayar Mühendisi &<br/><b>Yazılım Geliştirici.</b></p><p className="intro">Yazılım geliştirme, kurumsal sistemler, veri teknolojileri ve yapay zekâyı bir araya getirerek uçtan uca dijital çözümler geliştiren bir bilgisayar mühendisiyim.</p><a href="#projeler" className="round"><ChevronDown/></a></div>
   <div className="marquee" aria-label="Beceriler"><div className="skills-track">{skills.map(skill=><span key={skill}>{skill}<b aria-hidden="true">✦</b></span>)}</div></div>
  </section>

  <section id="projeler" className="projects section">
   <div className="section-top"><span className="label">Seçili projeler</span><h2>Projelerim ve<br/><em>hayata geçirdiklerim.</em></h2><p>Fikirden çalışan ürüne. Her kartın arkasında gerçek bir problem, teknik kararlar ve çalışan bir çözüm var.</p></div>
   <div className="project-grid">{projects.map((p,i)=><article className={"project "+(i===0?"wide":"")} key={p.id} tabIndex={0} role="button" aria-label={p.title+" projesini incele"} onClick={()=>setActive(p)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setActive(p)}}}>
    <div className="frame"><Visual p={p}/><span className="view-pill">İncele <ArrowUpRight/></span></div><div className="project-copy"><div><span>{p.no}</span><h3>{p.title}</h3><p>{p.subtitle}</p></div><div className="tech">{p.tech.slice(0,3).map(x=><span key={x}>{x}</span>)}</div><span className="more">Projeyi incele <ArrowUpRight/></span></div>
   </article>)}</div>
  </section>

  <section id="uzmanlik" className="expertise section">
   <span className="label">Becerilerim</span><div className="expertise-title"><h2>Üretirken kullandığım<br/><em>teknolojiler.</em></h2><p>Web uygulamalarından kurumsal sistemlere, veritabanı tasarımından veri analizine kadar projelerimde kullandığım teknolojiler ve geliştirme becerilerim.</p></div>
   <div className="expertise-list">
    {[["01",Code2,"Web & Yazılım Geliştirme","JavaScript · React · Vite · C · E-Ticaret"],["02",Database,"Backend & Veritabanı","Node.js · Express · REST API · SQL · SQL Server · T-SQL · Trigger · Stored Procedure"],["03",Boxes,"ERP & Kurumsal Sistemler","Workcube ERP · ColdFusion · SAP ABAP · İş Süreçleri"],["04",BrainCircuit,"Veri Analizi & Yapay Zekâ","Python · GeoPandas · ArcGIS · TensorFlow · Keras · OpenCV · CNN · NumPy · Mekânsal Veri · 3B Görselleştirme"]].map(([n,I,t,s])=><div className="expert-row" key={t}><span>{n}</span><I/><h3>{t}</h3><div className="skill-tags">{s.split(" · ").map(skill=><span key={skill}>{skill}</span>)}</div></div>)}
   </div>
  </section>

  <section id="deneyim" className="experience section">
   <div className="exp-head"><span className="label">Deneyimlerim</span><h2>Stajlarım ve<br/><em>kazandığım deneyimler.</em></h2></div>
   <div className="exp-list">
    <div className="exp"><b>2026</b><div><span>BÜYÜKÇEKMECE BELEDİYESİ</span><h3>Bilgisayar Mühendisliği Stajyeri</h3><p>Tarım Market e-ticaret sitesini uçtan uca geliştirdim. API verileriyle Büyükçekmece ilçesinin haftalık trafik yoğunluğunu analiz ettim ve İstanbul genelinde tahmini nüfus yoğunluğunu gösteren CBS tabanlı 3B haritalandırma çalışmasını hazırladım. Bu üç projeyi sıfırdan ve bağımsız olarak yürüttüm. Web geliştirme, API entegrasyonu, veri işleme, analiz ve görselleştirme alanlarında uygulamalı deneyim kazandım.</p></div><small>Bilgi İşlem Müdürlüğü</small></div>
    <div className="exp"><b>2025</b><div><span>ARVEN ADA BİLİŞİM VE DANIŞMANLIK</span><h3>Bilgisayar Mühendisliği Stajyeri</h3><p>Workcube ERP platformunda kurumsal yazılım geliştirme çalışmalarına katıldım. Farklı şirketlerin ihtiyaçlarına uygun ERP sistemlerinin tasarım ve geliştirme süreçlerinde görev alarak iş süreçlerinin dijitalleştirilmesi ve veri yönetimi alanlarında uygulamalı deneyim kazandım.</p></div><small>ERP / Kurumsal Yazılım</small></div>
    <div className="exp"><b>2024</b><div><span>KÜÇÜKÇEKMECE BELEDİYESİ</span><h3>Bilgisayar Mühendisliği Stajyeri</h3><p>Belediyenin Yönetim Bilgi Sistemi projesinde görev aldım. Stratejik planlama ve karar destek süreçlerine yönelik yazılım modülleri geliştirdim. Kurumsal yazılım, veri yönetimi ve belediyecilik bilgi sistemleri alanlarında deneyim kazandım.</p></div><small>Strateji Yazılım Müdürlüğü</small></div>
    <div className="exp"><b>2024</b><div><span>KÜÇÜKÇEKMECE BELEDİYESİ</span><h3>Bilgisayar Mühendisliği Stajyeri</h3><p>Bilgisayar bileşenlerinin montajında; sistem kurulumu, yapılandırma, bakım ve güncelleme çalışmalarında görev aldım. Donanım arızalarının tespiti ve teknik destek süreçlerine katılarak bilgisayar sistemleri ve bilgi işlem altyapıları konusunda uygulamalı deneyim kazandım.</p></div><small>Bilgi İşlem Müdürlüğü</small></div>
   </div>
  </section>

  <section id="hakkimda" className="about section">
   <div><span className="label">Bilgisayar Mühendisi</span><h2>Hakkımda.</h2></div>
   <div className="about-copy"><p>Beykent Üniversitesi Bilgisayar Mühendisliği mezunuyum. Yazılım geliştirme, veri analizi ve veri tabanı alanlarında gerçek dünya problemlerine yönelik projeler geliştirdim. Web teknolojileri, API entegrasyonları ve yapay zekâyı bir araya getirerek veriyi işlevsel dijital çözümlere dönüştürmeye odaklanan bir bilgisayar mühendisiyim. Analitik düşünme ve problem çözme yetkinliklerimi, yenilikçi ve sürdürülebilir yazılım çözümleri üretmek için kullanmayı hedefliyorum.</p></div>
  </section>
 </main>
 <footer id="iletisim"><div className="footer-main"><span className="label">İletişim · İstanbul</span><h2>İletişim &<br/><em>bağlantılar.</em></h2><a href="mailto:Mertars60@icloud.com">Mertars60@icloud.com <ArrowUpRight/></a><div className="contact-links"><a href="tel:+905307031139">+90 530 703 1139 <ArrowUpRight/></a><a href="https://www.linkedin.com/in/muhammet-mert-arslan-683946330" target="_blank" rel="noopener noreferrer">LinkedIn <Linkedin/></a><a className="action-link" href={cvUrl} download="Muhammet-Mert-Arslan-CV.pdf">CV indir · PDF <ArrowUpRight/></a><a href={cvUrl} target="_blank" rel="noopener noreferrer">CV görüntüle <ExternalLink/></a></div></div><div className="footer-bar"><span>© 2026 MUHAMMET MERT ARSLAN</span><div><a href="https://github.com/Mmertarslan" target="_blank" rel="noopener noreferrer" aria-label="GitHub profilim"><Github/></a><a href="https://www.linkedin.com/in/muhammet-mert-arslan-683946330" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profilim"><Linkedin/></a><a href="mailto:Mertars60@icloud.com" aria-label="E-posta gönder"><Mail/></a></div></div></footer>
 {active&&<div className="modal-bg" onClick={()=>setActive(null)}><div className="modal" role="dialog" aria-modal="true" aria-label={active.title} onClick={e=>e.stopPropagation()}><button className="x" aria-label="Kapat" onClick={()=>setActive(null)}><X/></button><Visual p={active}/><div className="modal-copy"><span className="label">Proje {active.no}</span><h2>{active.title}</h2><h4>{active.subtitle}</h4><p>{active.desc}</p>
   {active.coverImage&&<button className="image-open" onClick={()=>setImageIndex(0)}>Kapak görselini büyüt <ExternalLink/></button>}
   <div className="project-details">{[["Problem","problem"],["Katkım","contribution"],["Sonuç","result"]].map(([label,key])=><section key={key}><h3>{label}</h3><p>{projectDetails[active.id][key]}</p></section>)}</div>
   {active.pipeline&&<div className="pipeline"><span className="mini-label">Nasıl yaptım</span><ol>{active.pipeline.map((s,i)=><li key={i}>{s}</li>)}</ol></div>}
   {active.images&&<div className="gallery"><span className="mini-label">Çıktılar</span><div className="gallery-grid">{active.images.map((im,i)=><figure key={i}><button className="gallery-open" onClick={()=>setImageIndex(i+(active.coverImage?1:0))} aria-label={im.label+" — görseli büyüt"}><img src={im.src} alt={im.label} loading="lazy"/></button><figcaption>{im.label}</figcaption></figure>)}</div></div>}
   <div className="tech">{active.tech.map(x=><span key={x}>{x}</span>)}</div>
   {active.github&&active.github!=="#"?<a href={active.github} target="_blank" rel="noopener noreferrer"><Github/> GitHub'da kaynak kodu görüntüle <ExternalLink/></a>:active.sourceNote&&<p className="source-note"><Github/> {active.sourceNote}</p>}
  </div></div></div>}
 {active&&imageIndex!==null&&<ImageViewer images={activeImages} index={imageIndex} onIndex={setImageIndex} onClose={()=>setImageIndex(null)}/>}
 </>}
createRoot(document.getElementById("root")).render(<App/>);
