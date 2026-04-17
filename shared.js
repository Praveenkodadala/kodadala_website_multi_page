/* Kodadala Trading Company — shared.js */

/* Navbar scroll */
window.addEventListener('scroll', function(){
  var nav = document.getElementById('mainNav');
  if(nav) nav.classList.toggle('scrolled', window.scrollY > 20);
});

/* Mobile nav */
function toggleMobileNav(){
  var m=document.getElementById('navMobile'),h=document.getElementById('navHamburger');
  var o=m.classList.toggle('open');
  h.classList.toggle('open',o);
  document.body.style.overflow=o?'hidden':'';
}
function closeMobileNav(){
  var m=document.getElementById('navMobile'),h=document.getElementById('navHamburger');
  m.classList.remove('open');h.classList.remove('open');
  document.body.style.overflow='';
}

/* Scroll reveal */
(function(){
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('visible');});
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el);});
})();

/* Detail tabs */
function switchDetailTab(id, btn){
  document.querySelectorAll('.detail-tab-pane').forEach(function(p){p.classList.remove('active');});
  document.querySelectorAll('.detail-tab-btn').forEach(function(b){b.classList.remove('active');});
  var pane = document.getElementById('dpane-'+id);
  if(pane) pane.classList.add('active');
  if(btn) btn.classList.add('active');
}

/* Contact form */
function submitContactForm(){
  var n=document.getElementById('cName'),co=document.getElementById('cCompany'),
      e=document.getElementById('cEmail'),ph=document.getElementById('cPhone'),
      ct=document.getElementById('cCountry'),pr=document.getElementById('cProduct'),
      qt=document.getElementById('cQty'),m=document.getElementById('cMsg');
  if(!n||!e||!n.value.trim()||!e.value.trim()){alert('Please fill in your name and email.');return;}
  var s=encodeURIComponent('Enquiry — '+(pr?pr.value:'Indian Spices')+' — KODADALA TRADING COMPANY');
  var b=encodeURIComponent(
    'Hi Kodadala Team,\n\n'+
    'Name: '+(n?n.value:'')+
    '\nCompany: '+(co?co.value:'')+
    '\nEmail: '+(e?e.value:'')+
    '\nPhone: '+(ph?ph.value:'')+
    '\nCountry: '+(ct?ct.value:'')+
    '\nProduct: '+(pr?pr.value:'')+
    '\nQuantity: '+(qt?qt.value:'')+
    '\n\n'+(m?m.value:'')+
    '\n\nBest regards,\n'+(n?n.value:'')
  );
  window.location.href='mailto:sales@kodadala.com?subject='+s+'&body='+b;
}

/* Quote form (home page) */
// function submitQuote(){
//   var n=document.getElementById('qName').value.trim(),
//       c=document.getElementById('qCompany').value.trim(),
//       e=document.getElementById('qEmail').value.trim(),
//       co=document.getElementById('qCountry').value.trim(),
//       p=document.getElementById('qProduct').value,
//       m=document.getElementById('qMsg').value.trim();
//   if(!n||!e){alert('Please enter your name and email.');return;}
//   var s=encodeURIComponent('Quote Request — '+(p||'Indian Spices')+' — KODADALA TRADING COMPANY');
//   var b=encodeURIComponent('Hi Kodadala Team,\n\nI\'d like to request a quote.\n\nName: '+n+'\nCompany: '+c+'\nCountry: '+co+'\nProduct: '+p+'\n\n'+m+'\n\nBest regards,\n'+n);
//   window.location.href='mailto:sales@kodadala.com?subject='+s+'&body='+b;
// }



function openModal(product) {
  window.location.href = '/products/' + product + '/';
}


async function submitQuote() {
    const btn = document.querySelector(".form-submit");

    const formData = new FormData();

    formData.append("access_key", "3eeaf356-cce9-4d2a-a1a7-d8af589101cf");

    formData.append("name", document.getElementById("qName").value);
    formData.append("email", document.getElementById("qEmail").value);
    formData.append("message", document.getElementById("qMsg").value);

    // Optional extra fields
    formData.append("company", document.getElementById("qCompany").value);
    formData.append("country", document.getElementById("qCountry").value);
    formData.append("product", document.getElementById("qProduct").value);

    formData.append("subject", "New Inquiry from Kodadala Website");
    formData.append("from_name", "Kodadala Website");
   

    btn.innerText = "Sending...";
    btn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("✅ Inquiry sent successfully!");
            
            // Clear form
            document.getElementById("qName").value = "";
            document.getElementById("qEmail").value = "";
            document.getElementById("qMsg").value = "";
            document.getElementById("qCompany").value = "";
            document.getElementById("qCountry").value = "";
            document.getElementById("qProduct").value = "";

        } else {
            alert("❌ " + data.message);
        }

    } catch (error) {
        alert("⚠️ Something went wrong");
    }

    btn.innerText = "Send Inquiry →";
    btn.disabled = false;
}
