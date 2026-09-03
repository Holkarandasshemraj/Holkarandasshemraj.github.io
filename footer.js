(function(){
  function localImage(v){
    if(!v)return '';
    if(typeof v!=='string')return '';
    if(v.startsWith('/'))return v;
    var m=v.match(/https?:\/\/raw\.githubusercontent\.com\/[^/]+\/[^/]+\/main\/images\/uploads\/(.+)$/);
    if(m)return '/images/uploads/'+m[1].split('?')[0];
    if(/^https?:\/\//.test(v))return v;
    return '/images/uploads/'+v.split('/').pop();
  }
  function visualFixes(){
    var s=document.getElementById('hdhr-visual-fixes');
    if(!s){
      s=document.createElement('style');
      s.id='hdhr-visual-fixes';
      s.textContent='.slide{overflow:hidden;background:#f5f5f5}.slide-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:center center;z-index:0}.slide-content{z-index:2}.slide-shade{z-index:1}.about-image{overflow:hidden}.about-image img,.about-img img{width:100%;height:100%;object-fit:cover;display:block}.about-image{min-height:340px}.about-img{overflow:hidden}.about-img img{min-height:340px} @media(max-width:760px){.slides{min-height:430px}.slide-content{padding:40px 4%}.about-image{min-height:280px}.about-img img{min-height:280px}}';
      document.head.appendChild(s);
    }
    if(typeof data==='undefined')return;
    var src=localImage(data.about_image);
    if(src){
      var home=document.querySelector('.about-image');
      if(home){home.innerHTML='<img src="'+src.replace(/"/g,'&quot;')+'" alt="About our store">';}
      var about=document.getElementById('aboutImage');
      if(about)about.src=src;
    }
  }
  function patch(){
    if(typeof data==='undefined')return;
    window.imageUrl=localImage;
    try{
      if(typeof renderHeader==='function')renderHeader();
      if(typeof renderHomeHero==='function')renderHomeHero();
      if(typeof renderHomeCategories==='function')renderHomeCategories();
      if(typeof renderHomeProducts==='function')renderHomeProducts();
      if(typeof renderHomeWhy==='function')renderHomeWhy();
      if(typeof renderHomeAbout==='function')renderHomeAbout();
      var hb=document.getElementById('homeBrands');
      if(hb){
        if(data.show_brands===false){hb.style.display='none';hb.innerHTML=''}
        else if(typeof renderHomeBrands==='function')renderHomeBrands();
      }
      if(typeof renderBrands==='function' && document.body.dataset.page==='brands')renderBrands();
      if(typeof renderGallery==='function' && document.body.dataset.page==='gallery')renderGallery();
      if(typeof setupNav==='function')setupNav();
    }catch(e){console.error('HDHR UI patch:',e)}
    visualFixes();
    renderSiteFooter();
  }
  window.renderSiteFooter=function(){
    var f=document.querySelector('footer');
    if(!f||typeof data==='undefined')return;
    if(data.show_footer===false){f.style.display='none';return}
    f.style.display='block';
    var cats=(data.categories||[]).filter(function(x){return x&&x.show!==false&&x.name});
    var brands=(data.brands||[]).filter(function(x){return x&&x.show!==false&&x.name});
    var ex0=data.footer_explore||[];
    var q0=data.footer_quick_links||[];
    var fb0=data.footer_brands||[];
    var ex=(ex0.length?ex0:cats.map(function(c){return {label:c.name,url:'products.html?category='+encodeURIComponent(c.name),show:true}})).filter(function(x){return x&&x.show!==false&&x.label});
    var q=(q0.length?q0:[{label:'Bulk Orders',url:'contact.html',show:true},{label:'Printing Services',url:'contact.html',show:true},{label:'Terms of Service',url:'terms.html',show:true},{label:'Shipping Policy',url:'shipping.html',show:true},{label:'Refund & Cancellation Policy',url:'refund.html',show:true},{label:'Privacy Policy',url:'privacy.html',show:true},{label:'Contact us',url:'contact.html',show:true}]).filter(function(x){return x&&x.show!==false&&x.label});
    var fb=(fb0.length?fb0:brands.map(function(b){return {label:b.name,url:'products.html?brand='+encodeURIComponent(b.name),show:true}})).filter(function(x){return x&&x.show!==false&&x.label});
    var E=window.esc||function(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
    f.className='site-footer';
    f.innerHTML='<div class="container footer-grid">'+
      '<div class="footer-col"><h3>'+E(data.footer_explore_title||'Explore')+'</h3>'+ex.map(function(x){return '<a href="'+E(x.url||'#')+'">'+E(x.label)+'</a>'}).join('')+'</div>'+ 
      '<div class="footer-col"><h3>'+E(data.footer_brands_title||'Shop all Brands')+'</h3>'+fb.map(function(x){return '<a href="'+E(x.url||'#')+'">'+E(x.label)+'</a>'}).join('')+'</div>'+ 
      '<div class="footer-col"><h3>'+E(data.footer_quick_links_title||'Quick links')+'</h3>'+q.map(function(x){return '<a href="'+E(x.url||'#')+'">'+E(x.label)+'</a>'}).join('')+'</div>'+ 
      '<div class="footer-col footer-contact"><h3>'+E(data.footer_contact_title||'Contact us')+'</h3>'+ 
      (data.address?'<p>'+E(data.address).replace(/\n/g,'<br>')+'</p>':'')+ 
      (data.phone?'<a href="tel:'+E(data.phone)+'">'+E(data.phone)+'</a>':'')+ 
      (data.whatsapp?'<a href="https://wa.me/'+E(String(data.whatsapp).replace(/\D/g,''))+'">WhatsApp</a>':'')+ 
      (data.maps_link?'<a href="'+E(data.maps_link)+'" target="_blank" rel="noopener">View on Google Maps</a>':'')+ 
      '</div></div><div class="container footer-bottom"><strong>'+E(data.shop_name||'Holkaran Dass Hem Raj')+'</strong><span>'+E(data.footer_text||data.tagline||'')+'</span><span>© '+new Date().getFullYear()+' '+E(data.shop_name||'Holkaran Dass Hem Raj')+'. All rights reserved.</span></div>';
  };
  document.addEventListener('DOMContentLoaded',function(){setTimeout(patch,700)});
})();
