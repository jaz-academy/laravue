import{_ as me}from"./CustomRadiosWithIcon-e2ab32cb.js";import{_ as j}from"./AppSelect-d84851a7.js";import{_ as se}from"./AppTextarea-e9a11bc4.js";import{_ as R}from"./AppTextField-551ae4db.js";import{r as m,o as A,f as N,e as l,d as c,b as e,v as x,ai as g,n as t,c as q,F as te,i as de,y as M,K as ee,L as le,a$ as U,aU as i,x as ie,a0 as pe}from"./main-5d6fcc06.js";import{_ as ue}from"./_plugin-vue_export-helper-c27b6911.js";import{b as ce,V as ne}from"./VCard-63d8873a.js";import{V as Ve}from"./VSpacer-f9a6097f.js";import{V as oe}from"./VCardText-70db7304.js";import{V as w,a as o}from"./VRow-f7db24b9.js";import{V as k}from"./VForm-5df4740e.js";import{V as L}from"./VCheckbox-b6a8a5b9.js";import{a as P,V as T}from"./VRadioGroup-dcef73b8.js";import{V as I}from"./VDivider-5313c886.js";import{V as be,a as fe}from"./VList-dda4a1b0.js";import{a as O,b as K,c as Q,V as Ce}from"./VExpansionPanel-e6befe5f.js";import{V as ve}from"./form-7ce73969.js";import{V as z}from"./VTextField-5e761aa7.js";import{_ as ye}from"./AppDateTimePicker-33e36496.js";import{a as X,V as xe}from"./VTabs-bd575624.js";import{V as he,a as Z}from"./VWindowItem-96ca74dc.js";import{r as E,e as we}from"./validators-daf36985.js";import{_ as ge}from"./AppAutocomplete-5ca8b9f6.js";import{_ as Fe}from"./AppCardCode-06687a7a.js";import"./VSelect-1ff296b6.js";import"./forwardRefs-8348545e.js";import"./VImg-e6ea3912.js";import"./dialog-transition-70532b3b.js";import"./easing-9f15041e.js";import"./VMenu-79446f16.js";import"./VOverlay-5aaff2d6.js";import"./lazy-38763445.js";import"./scopeId-2df73914.js";import"./VCheckboxBtn-66ea5a8d.js";import"./VSelectionControl-0c11cef9.js";import"./VChip-ffb5d7b6.js";import"./VAvatar-9edca7b8.js";/* empty css                   */import"./VCounter-f8c24a1e.js";import"./VField-2b5aed59.js";import"./VInput-4b1c908d.js";import"./ssrBoot-972e998d.js";import"./VSlideGroup-ca75044e.js";import"./helpers-35260a98.js";import"./no-profile-4221a4a6.js";import"./filter-114d812b.js";const ke={class:"w-100 sticky-header"},Ae={class:"d-flex align-center gap-4 flex-wrap bg-background pa-6"},_e={class:"d-flex align-center gap-4"},Te={class:"d-flex align-center gap-2 my-4"},Re={__name:"DemoFormLayoutSticky",setup(_){const C=[{title:"Standard",desc:"Delivery in 3-5 days.",value:"standard",icon:{icon:"tabler-briefcase-2",size:"32"}},{title:"Express",desc:"Delivery within 2 days.",value:"express",icon:{icon:"tabler-rocket",size:"32"}},{title:"Overnight",desc:"Delivery within a days.",value:"overnight",icon:{icon:"tabler-crown",size:"32"}}],f=[{code:"TAKEITALL",desc:"Apply this code to get 15% discount on orders above 20$."},{code:"FESTIVE10",desc:"Apply this code to get 10% discount on all orders."},{code:"MYSTERYDEAL",desc:"Apply this code to get discount between 10% - 50%."}],r=m({fullName:"",email:"",contactNumber:null,altContactNumber:null,address:"",pincode:null,Landmark:"",city:"",state:null,defaultAddress:!1,addressType:"home",deliveryType:"overnight",promoCode:"",paymentMethod:"card",cardNumber:null,cardName:"",cardExDate:"",cardCvv:""});return(V,d)=>{const v=R,a=se,s=j,n=me;return A(),N(ne,{class:"overflow-visible"},{default:l(()=>[c("div",ke,[c("div",Ae,[e(ce,null,{default:l(()=>d[14]||(d[14]=[x("Sticky Action Bar")])),_:1}),e(Ve),c("div",null,[e(g,{variant:"tonal",class:"me-5"},{default:l(()=>d[15]||(d[15]=[x(" Back ")])),_:1}),e(g,null,{default:l(()=>d[16]||(d[16]=[x("Place Order")])),_:1})])])]),e(oe,null,{default:l(()=>[e(w,null,{default:l(()=>[e(o,{md:"8",cols:"12",class:"mx-auto"},{default:l(()=>[e(k,null,{default:l(()=>[d[22]||(d[22]=c("h2",{class:"text-lg font-weight-medium mb-6"}," 1. Delivery Address ",-1)),e(w,null,{default:l(()=>[e(o,{cols:"12",md:"6"},{default:l(()=>[e(v,{modelValue:t(r).fullName,"onUpdate:modelValue":d[0]||(d[0]=p=>t(r).fullName=p),label:"Full Name",placeholder:"John Doe"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(v,{modelValue:t(r).email,"onUpdate:modelValue":d[1]||(d[1]=p=>t(r).email=p),label:"Email",placeholder:"john.doe",suffix:"@example.com"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(v,{modelValue:t(r).contactNumber,"onUpdate:modelValue":d[2]||(d[2]=p=>t(r).contactNumber=p),label:"Contact Number",placeholder:"658 123 4567",type:"number"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(v,{modelValue:t(r).altContactNumber,"onUpdate:modelValue":d[3]||(d[3]=p=>t(r).altContactNumber=p),label:"Alternate Number",placeholder:"658 123 4567",type:"number"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(a,{modelValue:t(r).address,"onUpdate:modelValue":d[4]||(d[4]=p=>t(r).address=p),label:"Address",placeholder:"1456, Mall Road",rows:"2"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(v,{modelValue:t(r).pincode,"onUpdate:modelValue":d[5]||(d[5]=p=>t(r).pincode=p),label:"Pincode",placeholder:"658468",type:"number"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(v,{modelValue:t(r).Landmark,"onUpdate:modelValue":d[6]||(d[6]=p=>t(r).Landmark=p),label:"Landmark",placeholder:"Nr. Wall Street"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(v,{modelValue:t(r).city,"onUpdate:modelValue":d[7]||(d[7]=p=>t(r).city=p),label:"City",placeholder:"Jackson"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(s,{modelValue:t(r).state,"onUpdate:modelValue":d[8]||(d[8]=p=>t(r).state=p),label:"State",placeholder:"Select State",items:["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida"]},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(L,{modelValue:t(r).defaultAddress,"onUpdate:modelValue":d[9]||(d[9]=p=>t(r).defaultAddress=p),label:"Use this as default delivery address"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[d[17]||(d[17]=c("p",{class:"text-high-emphasis text-base mb-1"}," Address Type ",-1)),e(P,{modelValue:t(r).addressType,"onUpdate:modelValue":d[10]||(d[10]=p=>t(r).addressType=p),inline:""},{default:l(()=>[e(T,{label:"Home (All day delivery)",value:"home"}),e(T,{label:"Office (Delivery between 10 AM - 5 PM)",value:"work"})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(I,{class:"my-4"}),d[23]||(d[23]=c("h2",{class:"text-lg font-weight-medium mb-6"}," 2. Delivery Type ",-1)),e(n,{"selected-radio":t(r).deliveryType,"onUpdate:selectedRadio":d[11]||(d[11]=p=>t(r).deliveryType=p),"radio-content":C,"grid-column":{sm:"4",cols:"12"}},null,8,["selected-radio"]),e(I,{class:"my-4"}),d[24]||(d[24]=c("h2",{class:"text-lg font-weight-medium mb-6"}," 3. Apply Promo code ",-1)),c("div",_e,[e(v,{modelValue:t(r).promoCode,"onUpdate:modelValue":d[12]||(d[12]=p=>t(r).promoCode=p),density:"compact",placeholder:"TAKEITALL"},null,8,["modelValue"]),e(g,null,{default:l(()=>d[18]||(d[18]=[x("Apply")])),_:1})]),c("div",Te,[e(I,{style:{"border-style":"dashed"}}),d[19]||(d[19]=c("span",null,"OR",-1)),e(I,{style:{"border-style":"dashed"}})]),e(be,{class:"border rounded py-0",lines:"two"},{default:l(()=>[(A(),q(te,null,de(f,(p,b)=>e(fe,{key:p.code,title:p.code,subtitle:p.desc,class:M(b!==0?"border-t":"")},{append:l(()=>[e(g,{variant:"tonal"},{default:l(()=>d[20]||(d[20]=[x(" Apply ")])),_:1})]),_:2},1032,["title","subtitle","class"])),64))]),_:1}),e(I,{class:"my-4"}),d[25]||(d[25]=c("h2",{class:"text-lg font-weight-medium mb-6"}," 4. Payment Method ",-1)),e(P,{modelValue:t(r).paymentMethod,"onUpdate:modelValue":d[13]||(d[13]=p=>t(r).paymentMethod=p),inline:"",class:"mb-4"},{default:l(()=>[e(T,{value:"card",label:"Credit/Debit/ATM Card"}),e(T,{value:"cash-on-delivery",label:"Cash On Delivery"})]),_:1},8,["modelValue"]),ee(e(w,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(v,{label:"Card Number",placeholder:"1356 3215 6548 7898"})]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(v,{label:"Name",placeholder:"John Doe"})]),_:1}),e(o,{cols:"6",md:"3"},{default:l(()=>[e(v,{label:"Exp. Date",placeholder:"MM/YY"})]),_:1}),e(o,{cols:"6",md:"3"},{default:l(()=>[e(v,{label:"CVV Code",placeholder:"654"})]),_:1})]),_:1},512),[[le,t(r).paymentMethod==="card"]]),ee(c("div",null,d[21]||(d[21]=[c("p",null," Cash on delivery is a mode of payment where you make the payment after the goods/services are received. ",-1),c("p",null,"You can pay cash or make the payment via debit/credit card directly to the delivery person.",-1)]),512),[[le,t(r).paymentMethod==="cash-on-delivery"]])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}},Ne=ue(Re,[["__scopeId","data-v-80bd8c3e"]]);const Le={class:"me-1"},Ie={class:"d-flex gap-4"},Ue={__name:"DemoFormLayoutCollapsible",setup(_){const C=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii"],f=m("home"),r=m("standard"),V=m("credit-debit-card"),d=m(0),v=[{radioValue:"credit-debit-card",radioLabel:"Credit/Debit/ATM Card",icon:"tabler-credit-card"},{radioValue:"cash-on-delivery",radioLabel:"Cash On Delivery",icon:"tabler-help"}];return(a,s)=>{const n=R,p=se,b=j;return A(),N(Ce,{modelValue:t(d),"onUpdate:modelValue":s[6]||(s[6]=h=>i(d)?d.value=h:null)},{default:l(()=>[e(O,null,{default:l(()=>[e(K,null,{default:l(()=>s[7]||(s[7]=[x("Delivery Address")])),_:1}),e(Q,null,{default:l(()=>[e(k,{class:"pt-4 pb-2",onSubmit:U(()=>{},["prevent"])},{default:l(()=>[e(w,null,{default:l(()=>[e(o,{cols:"12",md:"6"},{default:l(()=>[e(n,{label:"Full Name",placeholder:"John Doe"})]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(n,{label:"Phone No",type:"number",placeholder:"+1 123 456 7890"})]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(p,{label:"Address",placeholder:"1234 Main St, New York, NY 10001, USA",rows:"3"})]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(n,{label:"Pincode",placeholder:"123456",type:"number"})]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(n,{label:"Landmark",placeholder:"Near City Mall"})]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(n,{label:"City",placeholder:"New York"})]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(b,{items:C,label:"State",placeholder:"Select State"})]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(ve,{class:"mb-3"},{default:l(()=>s[8]||(s[8]=[x(" Address Type ")])),_:1}),e(P,{modelValue:t(f),"onUpdate:modelValue":s[0]||(s[0]=h=>i(f)?f.value=h:null),inline:""},{default:l(()=>[c("div",null,[e(T,{label:"Home (All day delivery)",value:"home"}),e(T,{label:"Office (Delivery between 10 AM - 5 PM)",value:"office"})])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(O,null,{default:l(()=>[e(K,null,{default:l(()=>s[9]||(s[9]=[x("Delivery Options")])),_:1}),e(Q,null,{default:l(()=>[e(P,{modelValue:t(r),"onUpdate:modelValue":s[4]||(s[4]=h=>i(r)?r.value=h:null),class:"delivery-options pt-4 pb-2"},{default:l(()=>[c("div",{class:M(["delivery-option d-flex rounded-t",t(r)==="standard"?"active":""]),onClick:s[1]||(s[1]=h=>r.value="standard")},[e(T,{inline:"",value:"standard",class:"mt-n4"}),s[10]||(s[10]=c("div",{class:"w-100"},[c("div",{class:"d-flex justify-space-between"},[c("h6",{class:"text-base font-weight-medium"}," Standard 3-5 Days "),c("h6",{class:"text-base font-weight-medium"}," Free ")]),c("span",{class:"text-sm"},"Friday, 15 Nov - Monday, 18 Nov")],-1))],2),c("div",{class:M(["delivery-option d-flex",t(r)==="express"?"active":""]),onClick:s[2]||(s[2]=h=>r.value="express")},[e(T,{inline:"",class:"mt-n4",value:"express"}),s[11]||(s[11]=c("div",{class:"w-100"},[c("div",{class:"d-flex justify-space-between"},[c("h5",{class:"text-base font-weight-medium"}," Express "),c("h6",{class:"text-base font-weight-medium"}," $5.00 ")]),c("span",{class:"text-sm"},"Friday, 15 Nov - Sunday, 17 Nov")],-1))],2),c("div",{class:M(["delivery-option d-flex rounded-b",t(r)==="overnight"?"active":""]),onClick:s[3]||(s[3]=h=>r.value="overnight")},[e(T,{inline:"",class:"mt-n4",value:"overnight"}),s[12]||(s[12]=c("div",{class:"w-100"},[c("div",{class:"d-flex justify-space-between"},[c("h6",{class:"text-base font-weight-medium"}," Overnight "),c("h6",{class:"text-base font-weight-medium"}," $10.00 ")]),c("span",{class:"text-sm"},"Friday, 15 Nov - Saturday, 16 Nov")],-1))],2)]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(O,null,{default:l(()=>[e(K,null,{default:l(()=>s[13]||(s[13]=[x("Payment Method")])),_:1}),e(Q,null,{default:l(()=>[e(w,null,{default:l(()=>[e(o,{md:"6",cols:"12"},{default:l(()=>[e(k,{class:"pt-4 pb-2"},{default:l(()=>[c("div",null,[e(P,{modelValue:t(V),"onUpdate:modelValue":s[5]||(s[5]=h=>i(V)?V.value=h:null),inline:""},{default:l(()=>[c("div",null,[(A(),q(te,null,de(v,h=>e(T,{key:h.radioValue,value:h.radioValue},{label:l(()=>[c("span",Le,ie(h.radioLabel),1),e(pe,{size:"18",icon:h.icon},null,8,["icon"])]),_:2},1032,["value"])),64))])]),_:1},8,["modelValue"])]),ee(e(w,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(z,{label:"Card Number",type:"number",placeholder:"1234 5678 9012 3456"})]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(z,{label:"Name",placeholder:"john doe"})]),_:1}),e(o,{cols:"6",md:"3"},{default:l(()=>[e(z,{label:"Expiry Date",placeholder:"MM/YY"})]),_:1}),e(o,{cols:"6",md:"3"},{default:l(()=>[e(z,{label:"CVV Code",type:"number",max:"3",placeholder:"123"})]),_:1})]),_:1},512),[[le,t(V)==="credit-debit-card"]])]),_:1})]),_:1})]),_:1}),e(I,{class:"my-5"}),c("div",Ie,[e(g,null,{default:l(()=>s[14]||(s[14]=[x("Place Order")])),_:1}),e(g,{color:"secondary",variant:"tonal"},{default:l(()=>s[15]||(s[15]=[x(" Cancel ")])),_:1})])]),_:1})]),_:1})]),_:1},8,["modelValue"])}}},Se={__name:"DemoFormLayoutFormWithTabs",setup(_){const C=m("personal-info"),f=m(""),r=m(""),V=m(),d=m(""),v=m(),a=["USA","Canada","UK","Denmark","Germany","Iceland","Israel","Mexico"],s=["English","German","French","Spanish","Portuguese","Russian","Korean"],n=m(""),p=m(""),b=m(""),h=m(""),S=m(""),H=m(""),J=m(""),$=m(""),W=m(""),Y=m(""),G=m([]),D=m(!1),B=m(!1);return(Ke,u)=>{const F=R,ae=j,re=ye;return A(),q(te,null,[e(xe,{modelValue:t(C),"onUpdate:modelValue":u[0]||(u[0]=y=>i(C)?C.value=y:null)},{default:l(()=>[e(X,{value:"personal-info"},{default:l(()=>u[20]||(u[20]=[x(" Personal Info ")])),_:1}),e(X,{value:"account-details"},{default:l(()=>u[21]||(u[21]=[x(" Account Details ")])),_:1}),e(X,{value:"social-links"},{default:l(()=>u[22]||(u[22]=[x(" Social Links ")])),_:1})]),_:1},8,["modelValue"]),e(ne,{flat:""},{default:l(()=>[e(oe,null,{default:l(()=>[e(he,{modelValue:t(C),"onUpdate:modelValue":u[19]||(u[19]=y=>i(C)?C.value=y:null),class:"disable-tab-transition"},{default:l(()=>[e(Z,{value:"personal-info"},{default:l(()=>[e(k,{class:"mt-2"},{default:l(()=>[e(w,null,{default:l(()=>[e(o,{md:"6",cols:"12"},{default:l(()=>[e(F,{modelValue:t(f),"onUpdate:modelValue":u[1]||(u[1]=y=>i(f)?f.value=y:null),label:"First name",placeholder:"John"},null,8,["modelValue"])]),_:1}),e(o,{md:"6",cols:"12"},{default:l(()=>[e(F,{modelValue:t(r),"onUpdate:modelValue":u[2]||(u[2]=y=>i(r)?r.value=y:null),label:"Last name",placeholder:"Doe"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(ae,{modelValue:t(V),"onUpdate:modelValue":u[3]||(u[3]=y=>i(V)?V.value=y:null),items:a,label:"Country",placeholder:"Select Country"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(ae,{modelValue:t(G),"onUpdate:modelValue":u[4]||(u[4]=y=>i(G)?G.value=y:null),items:s,multiple:"",chips:"",clearable:"",label:"Language",placeholder:"Select Language"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(re,{modelValue:t(d),"onUpdate:modelValue":u[5]||(u[5]=y=>i(d)?d.value=y:null),label:"Birth Date",placeholder:"Select Birth Date"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(v),"onUpdate:modelValue":u[6]||(u[6]=y=>i(v)?v.value=y:null),type:"number",label:"Phone No.",placeholder:"+1 123 456 7890"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}),e(Z,{value:"account-details"},{default:l(()=>[e(k,{class:"mt-2"},{default:l(()=>[e(w,null,{default:l(()=>[e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(n),"onUpdate:modelValue":u[7]||(u[7]=y=>i(n)?n.value=y:null),label:"Username",placeholder:"Johndoe"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(p),"onUpdate:modelValue":u[8]||(u[8]=y=>i(p)?p.value=y:null),label:"Email",suffix:"@example.com",placeholder:"johndoe@email.com"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(b),"onUpdate:modelValue":u[9]||(u[9]=y=>i(b)?b.value=y:null),label:"Password",placeholder:"············",type:t(D)?"text":"password","append-inner-icon":t(D)?"tabler-eye-off":"tabler-eye","onClick:appendInner":u[10]||(u[10]=y=>D.value=!t(D))},null,8,["modelValue","type","append-inner-icon"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(h),"onUpdate:modelValue":u[11]||(u[11]=y=>i(h)?h.value=y:null),label:"Confirm Password",placeholder:"············",type:t(B)?"text":"password","append-inner-icon":t(B)?"tabler-eye-off":"tabler-eye","onClick:appendInner":u[12]||(u[12]=y=>B.value=!t(B))},null,8,["modelValue","type","append-inner-icon"])]),_:1})]),_:1})]),_:1})]),_:1}),e(Z,{value:"social-links"},{default:l(()=>[e(k,{class:"mt-2"},{default:l(()=>[e(w,null,{default:l(()=>[e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(S),"onUpdate:modelValue":u[13]||(u[13]=y=>i(S)?S.value=y:null),label:"Twitter",placeholder:"https://twitter.com/username"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(H),"onUpdate:modelValue":u[14]||(u[14]=y=>i(H)?H.value=y:null),label:"Facebook",placeholder:"https://facebook.com/username"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(J),"onUpdate:modelValue":u[15]||(u[15]=y=>i(J)?J.value=y:null),label:"Google+",placeholder:"https://plus.google.com/username"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t($),"onUpdate:modelValue":u[16]||(u[16]=y=>i($)?$.value=y:null),label:"LinkedIn",placeholder:"https://linkedin.com/username"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(W),"onUpdate:modelValue":u[17]||(u[17]=y=>i(W)?W.value=y:null),label:"Instagram",placeholder:"https://instagram.com/username"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(Y),"onUpdate:modelValue":u[18]||(u[18]=y=>i(Y)?Y.value=y:null),label:"Quora",placeholder:"https://quora.com/username"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(I),e(oe,{class:"d-flex gap-4"},{default:l(()=>[e(g,null,{default:l(()=>u[23]||(u[23]=[x("Submit")])),_:1}),e(g,{color:"secondary",variant:"tonal"},{default:l(()=>u[24]||(u[24]=[x(" Cancel ")])),_:1})]),_:1})]),_:1})],64)}}},Pe={__name:"DemoFormLayoutFormValidation",setup(_){const C=m(""),f=m(""),r=["Item 1","Item 2","Item 3","Item 4"],V=m(),d=m(!1),v=m();return(a,s)=>{const n=R,p=j;return A(),N(k,{ref_key:"form",ref:v,"lazy-validation":""},{default:l(()=>[e(w,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(n,{modelValue:t(C),"onUpdate:modelValue":s[0]||(s[0]=b=>i(C)?C.value=b:null),rules:["requiredValidator"in a?a.requiredValidator:t(E)],label:"Name",placeholder:"John Doe",required:""},null,8,["modelValue","rules"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(n,{modelValue:t(f),"onUpdate:modelValue":s[1]||(s[1]=b=>i(f)?f.value=b:null),rules:["emailValidator"in a?a.emailValidator:t(we),"requiredValidator"in a?a.requiredValidator:t(E)],label:"E-mail",placeholder:"johndoe@email.com",required:""},null,8,["modelValue","rules"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(p,{modelValue:t(V),"onUpdate:modelValue":s[2]||(s[2]=b=>i(V)?V.value=b:null),items:r,rules:["requiredValidator"in a?a.requiredValidator:t(E)],placeholder:"Select an Item",label:"Item",name:"select",require:""},null,8,["modelValue","rules"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(L,{modelValue:t(d),"onUpdate:modelValue":s[3]||(s[3]=b=>i(d)?d.value=b:null),rules:["requiredValidator"in a?a.requiredValidator:t(E)],label:"Do you agree?",required:""},null,8,["modelValue","rules"])]),_:1}),e(o,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:l(()=>[e(g,{color:"success",onClick:s[4]||(s[4]=b=>{var h;return(h=t(v))==null?void 0:h.validate()})},{default:l(()=>s[7]||(s[7]=[x(" Validate ")])),_:1}),e(g,{color:"error",onClick:s[5]||(s[5]=b=>{var h;return(h=t(v))==null?void 0:h.reset()})},{default:l(()=>s[8]||(s[8]=[x(" Reset Form ")])),_:1}),e(g,{color:"warning",onClick:s[6]||(s[6]=b=>{var h;return(h=t(v))==null?void 0:h.resetValidation()})},{default:l(()=>s[9]||(s[9]=[x(" Reset Validation ")])),_:1})]),_:1})]),_:1})]),_:1},512)}}},De={__name:"DemoFormLayoutFormHint",setup(_){const C=m(""),f=m(""),r=m(),V=m(!1),d=["foo","bar","fizz","buzz"],v=m([]);return(a,s)=>{const n=R,p=ge;return A(),N(k,{onSubmit:U(()=>{},["prevent"])},{default:l(()=>[e(w,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(n,{modelValue:t(C),"onUpdate:modelValue":s[0]||(s[0]=b=>i(C)?C.value=b:null),label:"Username",placeholder:"Johndoe"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(n,{modelValue:t(f),"onUpdate:modelValue":s[1]||(s[1]=b=>i(f)?f.value=b:null),label:"Email",type:"email",placeholder:"johndoe@email.com"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(n,{modelValue:t(r),"onUpdate:modelValue":s[2]||(s[2]=b=>i(r)?r.value=b:null),label:"Password",autocomplete:"on",type:"password","persistent-hint":"",placeholder:"············",hint:"Your password must be 8-20 characters long."},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(p,{modelValue:t(v),"onUpdate:modelValue":s[3]||(s[3]=b=>i(v)?v.value=b:null),items:d,chips:"",multiple:"",label:"Autocomplete",placeholder:"Select"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(L,{modelValue:t(V),"onUpdate:modelValue":s[4]||(s[4]=b=>i(V)?V.value=b:null),label:"Remember me"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",class:"d-flex gap-4"},{default:l(()=>[e(g,{type:"submit"},{default:l(()=>s[5]||(s[5]=[x(" Submit ")])),_:1}),e(g,{color:"secondary",type:"reset",variant:"tonal"},{default:l(()=>s[6]||(s[6]=[x(" Reset ")])),_:1})]),_:1})]),_:1})]),_:1})}}},Be={__name:"DemoFormLayoutMultipleColumn",setup(_){const C=m(""),f=m(""),r=m(""),V=m(""),d=m(""),v=m(""),a=m(!1);return(s,n)=>{const p=R;return A(),N(k,{onSubmit:U(()=>{},["prevent"])},{default:l(()=>[e(w,null,{default:l(()=>[e(o,{cols:"12",md:"6"},{default:l(()=>[e(p,{modelValue:t(C),"onUpdate:modelValue":n[0]||(n[0]=b=>i(C)?C.value=b:null),label:"First Name",placeholder:"John"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(p,{modelValue:t(f),"onUpdate:modelValue":n[1]||(n[1]=b=>i(f)?f.value=b:null),label:"Last Name",placeholder:"Doe"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(p,{modelValue:t(v),"onUpdate:modelValue":n[2]||(n[2]=b=>i(v)?v.value=b:null),label:"Email",placeholder:"johndoe@email.com"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(p,{modelValue:t(r),"onUpdate:modelValue":n[3]||(n[3]=b=>i(r)?r.value=b:null),label:"City",placeholder:"New York"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(p,{modelValue:t(V),"onUpdate:modelValue":n[4]||(n[4]=b=>i(V)?V.value=b:null),label:"Country",placeholder:"United States"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(p,{modelValue:t(d),"onUpdate:modelValue":n[5]||(n[5]=b=>i(d)?d.value=b:null),label:"Company",placeholder:"Pixinvent"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(L,{modelValue:t(a),"onUpdate:modelValue":n[6]||(n[6]=b=>i(a)?a.value=b:null),label:"Remember me"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",class:"d-flex gap-4"},{default:l(()=>[e(g,{type:"submit"},{default:l(()=>n[7]||(n[7]=[x(" Submit ")])),_:1}),e(g,{type:"reset",color:"secondary",variant:"tonal"},{default:l(()=>n[8]||(n[8]=[x(" Reset ")])),_:1})]),_:1})]),_:1})]),_:1})}}},ze={__name:"DemoFormLayoutVerticalFormWithIcons",setup(_){const C=m(""),f=m(""),r=m(),V=m(),d=m(!1);return(v,a)=>{const s=R;return A(),N(k,{onSubmit:U(n=>({}),["prevent"])},{default:l(()=>[e(w,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(s,{modelValue:t(C),"onUpdate:modelValue":a[0]||(a[0]=n=>i(C)?C.value=n:null),"prepend-inner-icon":"tabler-user",label:"First Name",placeholder:"John"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(s,{modelValue:t(f),"onUpdate:modelValue":a[1]||(a[1]=n=>i(f)?f.value=n:null),"prepend-inner-icon":"tabler-mail",label:"Email",type:"email",placeholder:"johndoe@example.com"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(s,{modelValue:t(r),"onUpdate:modelValue":a[2]||(a[2]=n=>i(r)?r.value=n:null),"prepend-inner-icon":"tabler-device-mobile",label:"Mobile",placeholder:"+1 123 456 7890",type:"number"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(s,{modelValue:t(V),"onUpdate:modelValue":a[3]||(a[3]=n=>i(V)?V.value=n:null),"prepend-inner-icon":"tabler-lock",label:"Password",autocomplete:"on",type:"password",placeholder:"············"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(L,{modelValue:t(d),"onUpdate:modelValue":a[4]||(a[4]=n=>i(d)?d.value=n:null),label:"Remember me"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(g,{type:"submit",class:"me-2"},{default:l(()=>a[5]||(a[5]=[x(" Submit ")])),_:1}),e(g,{color:"secondary",type:"reset",variant:"tonal"},{default:l(()=>a[6]||(a[6]=[x(" Reset ")])),_:1})]),_:1})]),_:1})]),_:1})}}},Ee={__name:"DemoFormLayoutVerticalForm",setup(_){const C=m(""),f=m(""),r=m(),V=m(),d=m(!1);return(v,a)=>{const s=R;return A(),N(k,{onSubmit:U(()=>{},["prevent"])},{default:l(()=>[e(w,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(s,{modelValue:t(C),"onUpdate:modelValue":a[0]||(a[0]=n=>i(C)?C.value=n:null),label:"First Name",placeholder:"John"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(s,{modelValue:t(f),"onUpdate:modelValue":a[1]||(a[1]=n=>i(f)?f.value=n:null),label:"Email",type:"email",placeholder:"johndoe@example.com"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(s,{modelValue:t(r),"onUpdate:modelValue":a[2]||(a[2]=n=>i(r)?r.value=n:null),label:"Mobile",placeholder:"+1 123 456 7890",type:"number"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(s,{modelValue:t(V),"onUpdate:modelValue":a[3]||(a[3]=n=>i(V)?V.value=n:null),label:"Password",autocomplete:"on",type:"password",placeholder:"············"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(L,{modelValue:t(d),"onUpdate:modelValue":a[4]||(a[4]=n=>i(d)?d.value=n:null),label:"Remember me"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",class:"d-flex gap-4"},{default:l(()=>[e(g,{type:"submit"},{default:l(()=>a[5]||(a[5]=[x(" Submit ")])),_:1}),e(g,{type:"reset",color:"secondary",variant:"tonal"},{default:l(()=>a[6]||(a[6]=[x(" Reset ")])),_:1})]),_:1})]),_:1})]),_:1})}}},Me={__name:"DemoFormLayoutHorizontalFormWithIcons",setup(_){const C=m(""),f=m(""),r=m(),V=m(),d=m(!1);return(v,a)=>{const s=R;return A(),N(k,{onSubmit:U(()=>{},["prevent"])},{default:l(()=>[e(w,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(w,{"no-gutters":""},{default:l(()=>[e(o,{cols:"12",md:"3",class:"d-flex align-items-center"},{default:l(()=>a[5]||(a[5]=[c("label",{class:"v-label text-body-2 text-high-emphasis",for:"firstNameHorizontalIcons"},"First Name",-1)])),_:1}),e(o,{cols:"12",md:"9"},{default:l(()=>[e(s,{id:"firstNameHorizontalIcons",modelValue:t(C),"onUpdate:modelValue":a[0]||(a[0]=n=>i(C)?C.value=n:null),"prepend-inner-icon":"tabler-user",placeholder:"John","persistent-placeholder":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(w,{"no-gutters":""},{default:l(()=>[e(o,{cols:"12",md:"3",class:"d-flex align-items-center"},{default:l(()=>a[6]||(a[6]=[c("label",{class:"v-label text-body-2 text-high-emphasis",for:"emailHorizontalIcons"},"Email",-1)])),_:1}),e(o,{cols:"12",md:"9"},{default:l(()=>[e(s,{id:"emailHorizontalIcons",modelValue:t(f),"onUpdate:modelValue":a[1]||(a[1]=n=>i(f)?f.value=n:null),"prepend-inner-icon":"tabler-mail",placeholder:"johndoe@email.com","persistent-placeholder":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(w,{"no-gutters":""},{default:l(()=>[e(o,{cols:"12",md:"3",class:"d-flex align-items-center"},{default:l(()=>a[7]||(a[7]=[c("label",{class:"v-label text-body-2 text-high-emphasis",for:"mobileHorizontalIcons"},"Mobile",-1)])),_:1}),e(o,{cols:"12",md:"9"},{default:l(()=>[e(s,{id:"mobileHorizontalIcons",modelValue:t(r),"onUpdate:modelValue":a[2]||(a[2]=n=>i(r)?r.value=n:null),type:"number","prepend-inner-icon":"tabler-device-mobile",placeholder:"+1 123 456 7890","persistent-placeholder":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(w,{"no-gutters":""},{default:l(()=>[e(o,{cols:"12",md:"3",class:"d-flex align-items-center"},{default:l(()=>a[8]||(a[8]=[c("label",{class:"v-label text-body-2 text-high-emphasis",for:"passwordHorizontalIcons"},"Password",-1)])),_:1}),e(o,{cols:"12",md:"9"},{default:l(()=>[e(s,{id:"passwordHorizontalIcons",modelValue:t(V),"onUpdate:modelValue":a[3]||(a[3]=n=>i(V)?V.value=n:null),"prepend-inner-icon":"tabler-lock",autocomplete:"on",type:"password",placeholder:"············","persistent-placeholder":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(o,{"offset-md":"3",cols:"12",md:"9"},{default:l(()=>[e(L,{modelValue:t(d),"onUpdate:modelValue":a[4]||(a[4]=n=>i(d)?d.value=n:null),label:"Remember me"},null,8,["modelValue"])]),_:1}),e(o,{"offset-md":"3",cols:"12",md:"9",class:"d-flex gap-4"},{default:l(()=>[e(g,{type:"submit"},{default:l(()=>a[9]||(a[9]=[x(" Submit ")])),_:1}),e(g,{color:"secondary",type:"reset",variant:"tonal"},{default:l(()=>a[10]||(a[10]=[x(" Reset ")])),_:1})]),_:1})]),_:1})]),_:1})}}},je={__name:"DemoFormLayoutHorizontalForm",setup(_){const C=m(""),f=m(""),r=m(),V=m(),d=m(!1);return(v,a)=>{const s=R;return A(),N(k,{onSubmit:U(()=>{},["prevent"])},{default:l(()=>[e(w,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(w,{"no-gutters":""},{default:l(()=>[e(o,{cols:"12",md:"3",class:"d-flex align-items-center"},{default:l(()=>a[5]||(a[5]=[c("label",{class:"v-label text-body-2 text-high-emphasis",for:"firstName"},"First Name",-1)])),_:1}),e(o,{cols:"12",md:"9"},{default:l(()=>[e(s,{id:"firstName",modelValue:t(C),"onUpdate:modelValue":a[0]||(a[0]=n=>i(C)?C.value=n:null),placeholder:"John","persistent-placeholder":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(w,{"no-gutters":""},{default:l(()=>[e(o,{cols:"12",md:"3",class:"d-flex align-items-center"},{default:l(()=>a[6]||(a[6]=[c("label",{class:"v-label text-body-2 text-high-emphasis",for:"email"},"Email",-1)])),_:1}),e(o,{cols:"12",md:"9"},{default:l(()=>[e(s,{id:"email",modelValue:t(f),"onUpdate:modelValue":a[1]||(a[1]=n=>i(f)?f.value=n:null),placeholder:"johndoe@email.com","persistent-placeholder":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(w,{"no-gutters":""},{default:l(()=>[e(o,{cols:"12",md:"3",class:"d-flex align-items-center"},{default:l(()=>a[7]||(a[7]=[c("label",{class:"v-label text-body-2 text-high-emphasis",for:"mobile"},"Mobile",-1)])),_:1}),e(o,{cols:"12",md:"9"},{default:l(()=>[e(s,{id:"mobile",modelValue:t(r),"onUpdate:modelValue":a[2]||(a[2]=n=>i(r)?r.value=n:null),type:"number",placeholder:"+1 123 456 7890","persistent-placeholder":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(w,{"no-gutters":""},{default:l(()=>[e(o,{cols:"12",md:"3",class:"d-flex align-items-center"},{default:l(()=>a[8]||(a[8]=[c("label",{class:"v-label text-body-2 text-high-emphasis",for:"password"},"Password",-1)])),_:1}),e(o,{cols:"12",md:"9"},{default:l(()=>[e(s,{id:"password",modelValue:t(V),"onUpdate:modelValue":a[3]||(a[3]=n=>i(V)?V.value=n:null),autocomplete:"on",type:"password",placeholder:"············","persistent-placeholder":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(o,{"offset-md":"3",cols:"12",md:"9"},{default:l(()=>[e(L,{modelValue:t(d),"onUpdate:modelValue":a[4]||(a[4]=n=>i(d)?d.value=n:null),label:"Remember me"},null,8,["modelValue"])]),_:1}),e(o,{"offset-md":"3",cols:"12",md:"9",class:"d-flex gap-4"},{default:l(()=>[e(g,{type:"submit"},{default:l(()=>a[9]||(a[9]=[x(" Submit ")])),_:1}),e(g,{color:"secondary",variant:"tonal",type:"reset"},{default:l(()=>a[10]||(a[10]=[x(" Reset ")])),_:1})]),_:1})]),_:1})]),_:1})}}},qe={ts:`<script lang="ts" setup>
const username = ref('')
const email = ref('')
const password = ref<string>()
const checkbox = ref(false)
const items = ['foo', 'bar', 'fizz', 'buzz'] as const
const values = ref<typeof items[number][]>([])
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <!-- 👉 Username -->
        <AppTextField
          v-model="username"
          label="Username"
          placeholder="Johndoe"
        />
      </VCol>

      <VCol cols="12">
        <!-- 👉 Email -->
        <AppTextField
          v-model="email"
          label="Email"
          type="email"
          placeholder="johndoe@email.com"
        />
      </VCol>

      <VCol cols="12">
        <!-- 👉 Password -->
        <AppTextField
          v-model="password"
          label="Password"
          autocomplete="on"
          type="password"
          persistent-hint
          placeholder="············"
          hint="Your password must be 8-20 characters long."
        />
      </VCol>

      <VCol cols="12">
        <!-- 👉 Autocomplete -->
        <AppAutocomplete
          v-model="values"
          :items="items"
          chips
          multiple
          label="Autocomplete"
          placeholder="Select"
        />
      </VCol>

      <VCol cols="12">
        <!-- 👉 Checkbox -->
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <!-- 👉 submit and reset button -->
        <VBtn type="submit">
          Submit
        </VBtn>

        <VBtn
          color="secondary"
          type="reset"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`,js:`<script setup>
const username = ref('')
const email = ref('')
const password = ref()
const checkbox = ref(false)

const items = [
  'foo',
  'bar',
  'fizz',
  'buzz',
]

const values = ref([])
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <!-- 👉 Username -->
        <AppTextField
          v-model="username"
          label="Username"
          placeholder="Johndoe"
        />
      </VCol>

      <VCol cols="12">
        <!-- 👉 Email -->
        <AppTextField
          v-model="email"
          label="Email"
          type="email"
          placeholder="johndoe@email.com"
        />
      </VCol>

      <VCol cols="12">
        <!-- 👉 Password -->
        <AppTextField
          v-model="password"
          label="Password"
          autocomplete="on"
          type="password"
          persistent-hint
          placeholder="············"
          hint="Your password must be 8-20 characters long."
        />
      </VCol>

      <VCol cols="12">
        <!-- 👉 Autocomplete -->
        <AppAutocomplete
          v-model="values"
          :items="items"
          chips
          multiple
          label="Autocomplete"
          placeholder="Select"
        />
      </VCol>

      <VCol cols="12">
        <!-- 👉 Checkbox -->
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <!-- 👉 submit and reset button -->
        <VBtn type="submit">
          Submit
        </VBtn>

        <VBtn
          color="secondary"
          type="reset"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`},He={ts:`<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { VForm } from 'vuetify/components/VForm'

const name = ref('')
const email = ref('')
const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'] as const
const select = ref<typeof items[number]>()
const checkbox = ref(false)
const form = ref<VForm>()
<\/script>

<template>
  <VForm
    ref="form"
    lazy-validation
  >
    <VRow>
      <VCol cols="12">
        <AppTextField
          v-model="name"
          :rules="[requiredValidator]"
          label="Name"
          placeholder="John Doe"
          required
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="email"
          :rules="[emailValidator, requiredValidator]"
          label="E-mail"
          placeholder="johndoe@email.com"
          required
        />
      </VCol>

      <VCol cols="12">
        <AppSelect
          v-model="select"
          :items="items"
          :rules="[requiredValidator]"
          placeholder="Select an Item"
          label="Item"
          name="select"
          require
        />
      </VCol>

      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          :rules="[requiredValidator]"
          label="Do you agree?"
          required
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex flex-wrap gap-4"
      >
        <VBtn
          color="success"
          @click="form?.validate()"
        >
          Validate
        </VBtn>

        <VBtn
          color="error"
          @click="form?.reset()"
        >
          Reset Form
        </VBtn>

        <VBtn
          color="warning"
          @click="form?.resetValidation()"
        >
          Reset Validation
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`,js:`<script setup>
const name = ref('')
const email = ref('')

const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
]

const select = ref()
const checkbox = ref(false)
const form = ref()
<\/script>

<template>
  <VForm
    ref="form"
    lazy-validation
  >
    <VRow>
      <VCol cols="12">
        <AppTextField
          v-model="name"
          :rules="[requiredValidator]"
          label="Name"
          placeholder="John Doe"
          required
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="email"
          :rules="[emailValidator, requiredValidator]"
          label="E-mail"
          placeholder="johndoe@email.com"
          required
        />
      </VCol>

      <VCol cols="12">
        <AppSelect
          v-model="select"
          :items="items"
          :rules="[requiredValidator]"
          placeholder="Select an Item"
          label="Item"
          name="select"
          require
        />
      </VCol>

      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          :rules="[requiredValidator]"
          label="Do you agree?"
          required
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex flex-wrap gap-4"
      >
        <VBtn
          color="success"
          @click="form?.validate()"
        >
          Validate
        </VBtn>

        <VBtn
          color="error"
          @click="form?.reset()"
        >
          Reset Form
        </VBtn>

        <VBtn
          color="warning"
          @click="form?.resetValidation()"
        >
          Reset Validation
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`},Je={ts:`<script lang="ts" setup>
const tab = ref('personal-info')
const firstName = ref('')
const lastName = ref('')
const country = ref()
const birthDate = ref('')
const phoneNo = ref<number>()
const countryList = ['USA', 'Canada', 'UK', 'Denmark', 'Germany', 'Iceland', 'Israel', 'Mexico']
const languageList = ['English', 'German', 'French', 'Spanish', 'Portuguese', 'Russian', 'Korean'] as const
const username = ref('')
const email = ref('')
const password = ref('')
const cPassword = ref('')
const twitterLink = ref('')
const facebookLink = ref('')
const googlePlusLink = ref('')
const linkedInLink = ref('')
const instagramLink = ref('')
const quoraLink = ref('')
const languages = ref<typeof languageList[number][]>([])
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)
<\/script>

<template>
  <VTabs v-model="tab">
    <VTab value="personal-info">
      Personal Info
    </VTab>
    <VTab value="account-details">
      Account Details
    </VTab>
    <VTab value="social-links">
      Social Links
    </VTab>
  </VTabs>

  <VCard flat>
    <VCardText>
      <VWindow
        v-model="tab"
        class="disable-tab-transition"
      >
        <VWindowItem value="personal-info">
          <VForm class="mt-2">
            <VRow>
              <VCol
                md="6"
                cols="12"
              >
                <AppTextField
                  v-model="firstName"
                  label="First name"
                  placeholder="John"
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                <AppTextField
                  v-model="lastName"
                  label="Last name"
                  placeholder="Doe"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="country"
                  :items="countryList"
                  label="Country"
                  placeholder="Select Country"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="languages"
                  :items="languageList"
                  multiple
                  chips
                  clearable
                  label="Language"
                  placeholder="Select Language"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppDateTimePicker
                  v-model="birthDate"
                  label="Birth Date"
                  placeholder="Select Birth Date"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="phoneNo"
                  type="number"
                  label="Phone No."
                  placeholder="+1 123 456 7890"
                />
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem value="account-details">
          <VForm class="mt-2">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="username"
                  label="Username"
                  placeholder="Johndoe"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="email"
                  label="Email"
                  suffix="@example.com"
                  placeholder="johndoe@email.com"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="cPassword"
                  label="Confirm Password"
                  placeholder="············"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                />
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem value="social-links">
          <VForm class="mt-2">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="twitterLink"
                  label="Twitter"
                  placeholder="https://twitter.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="facebookLink"
                  label="Facebook"
                  placeholder="https://facebook.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="googlePlusLink"
                  label="Google+"
                  placeholder="https://plus.google.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="linkedInLink"
                  label="LinkedIn"
                  placeholder="https://linkedin.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="instagramLink"
                  label="Instagram"
                  placeholder="https://instagram.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="quoraLink"
                  label="Quora"
                  placeholder="https://quora.com/username"
                />
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>
      </VWindow>
    </VCardText>

    <VDivider />

    <VCardText class="d-flex gap-4">
      <VBtn>Submit</VBtn>
      <VBtn
        color="secondary"
        variant="tonal"
      >
        Cancel
      </VBtn>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
const tab = ref('personal-info')
const firstName = ref('')
const lastName = ref('')
const country = ref()
const birthDate = ref('')
const phoneNo = ref()

const countryList = [
  'USA',
  'Canada',
  'UK',
  'Denmark',
  'Germany',
  'Iceland',
  'Israel',
  'Mexico',
]

const languageList = [
  'English',
  'German',
  'French',
  'Spanish',
  'Portuguese',
  'Russian',
  'Korean',
]

const username = ref('')
const email = ref('')
const password = ref('')
const cPassword = ref('')
const twitterLink = ref('')
const facebookLink = ref('')
const googlePlusLink = ref('')
const linkedInLink = ref('')
const instagramLink = ref('')
const quoraLink = ref('')
const languages = ref([])
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)
<\/script>

<template>
  <VTabs v-model="tab">
    <VTab value="personal-info">
      Personal Info
    </VTab>
    <VTab value="account-details">
      Account Details
    </VTab>
    <VTab value="social-links">
      Social Links
    </VTab>
  </VTabs>

  <VCard flat>
    <VCardText>
      <VWindow
        v-model="tab"
        class="disable-tab-transition"
      >
        <VWindowItem value="personal-info">
          <VForm class="mt-2">
            <VRow>
              <VCol
                md="6"
                cols="12"
              >
                <AppTextField
                  v-model="firstName"
                  label="First name"
                  placeholder="John"
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                <AppTextField
                  v-model="lastName"
                  label="Last name"
                  placeholder="Doe"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="country"
                  :items="countryList"
                  label="Country"
                  placeholder="Select Country"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="languages"
                  :items="languageList"
                  multiple
                  chips
                  clearable
                  label="Language"
                  placeholder="Select Language"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppDateTimePicker
                  v-model="birthDate"
                  label="Birth Date"
                  placeholder="Select Birth Date"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="phoneNo"
                  type="number"
                  label="Phone No."
                  placeholder="+1 123 456 7890"
                />
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem value="account-details">
          <VForm class="mt-2">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="username"
                  label="Username"
                  placeholder="Johndoe"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="email"
                  label="Email"
                  suffix="@example.com"
                  placeholder="johndoe@email.com"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="cPassword"
                  label="Confirm Password"
                  placeholder="············"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                />
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem value="social-links">
          <VForm class="mt-2">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="twitterLink"
                  label="Twitter"
                  placeholder="https://twitter.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="facebookLink"
                  label="Facebook"
                  placeholder="https://facebook.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="googlePlusLink"
                  label="Google+"
                  placeholder="https://plus.google.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="linkedInLink"
                  label="LinkedIn"
                  placeholder="https://linkedin.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="instagramLink"
                  label="Instagram"
                  placeholder="https://instagram.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="quoraLink"
                  label="Quora"
                  placeholder="https://quora.com/username"
                />
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>
      </VWindow>
    </VCardText>

    <VDivider />

    <VCardText class="d-flex gap-4">
      <VBtn>Submit</VBtn>
      <VBtn
        color="secondary"
        variant="tonal"
      >
        Cancel
      </VBtn>
    </VCardText>
  </VCard>
</template>
`},$e={ts:`<script lang="ts" setup>
const firstName = ref('')
const email = ref('')
const mobile = ref<number>()
const password = ref<string>()
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 First Name -->
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="firstName"
            >First Name</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="firstName"
              v-model="firstName"
              placeholder="John"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Email -->
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="email"
            >Email</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="email"
              v-model="email"
              placeholder="johndoe@email.com"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Mobile -->
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="mobile"
            >Mobile</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="mobile"
              v-model="mobile"
              type="number"
              placeholder="+1 123 456 7890"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Password -->
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="password"
            >Password</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="password"
              v-model="password"
              autocomplete="on"
              type="password"
              placeholder="············"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Remember me -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
      >
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <!-- 👉 submit and reset button -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>
        <VBtn
          color="secondary"
          variant="tonal"
          type="reset"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`,js:`<script setup>
const firstName = ref('')
const email = ref('')
const mobile = ref()
const password = ref()
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 First Name -->
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="firstName"
            >First Name</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="firstName"
              v-model="firstName"
              placeholder="John"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Email -->
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="email"
            >Email</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="email"
              v-model="email"
              placeholder="johndoe@email.com"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Mobile -->
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="mobile"
            >Mobile</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="mobile"
              v-model="mobile"
              type="number"
              placeholder="+1 123 456 7890"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Password -->
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="password"
            >Password</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="password"
              v-model="password"
              autocomplete="on"
              type="password"
              placeholder="············"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Remember me -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
      >
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <!-- 👉 submit and reset button -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>
        <VBtn
          color="secondary"
          variant="tonal"
          type="reset"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`},We={ts:`<script lang="ts" setup>
const firstName = ref('')
const email = ref('')
const mobile = ref<number>()
const password = ref<string>()
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <!-- 👉 First Name -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="firstNameHorizontalIcons"
            >First Name</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="firstNameHorizontalIcons"
              v-model="firstName"
              prepend-inner-icon="tabler-user"
              placeholder="John"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Email -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="emailHorizontalIcons"
            >Email</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="emailHorizontalIcons"
              v-model="email"
              prepend-inner-icon="tabler-mail"
              placeholder="johndoe@email.com"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Mobile -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="mobileHorizontalIcons"
            >Mobile</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="mobileHorizontalIcons"
              v-model="mobile"
              type="number"
              prepend-inner-icon="tabler-device-mobile"
              placeholder="+1 123 456 7890"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Password -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="passwordHorizontalIcons"
            >Password</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="passwordHorizontalIcons"
              v-model="password"
              prepend-inner-icon="tabler-lock"
              autocomplete="on"
              type="password"
              placeholder="············"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Checkbox -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
      >
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <!-- 👉 submit and reset button -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>
        <VBtn
          color="secondary"
          type="reset"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`,js:`<script setup>
const firstName = ref('')
const email = ref('')
const mobile = ref()
const password = ref()
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <!-- 👉 First Name -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="firstNameHorizontalIcons"
            >First Name</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="firstNameHorizontalIcons"
              v-model="firstName"
              prepend-inner-icon="tabler-user"
              placeholder="John"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Email -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="emailHorizontalIcons"
            >Email</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="emailHorizontalIcons"
              v-model="email"
              prepend-inner-icon="tabler-mail"
              placeholder="johndoe@email.com"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Mobile -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="mobileHorizontalIcons"
            >Mobile</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="mobileHorizontalIcons"
              v-model="mobile"
              type="number"
              prepend-inner-icon="tabler-device-mobile"
              placeholder="+1 123 456 7890"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Password -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="passwordHorizontalIcons"
            >Password</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="passwordHorizontalIcons"
              v-model="password"
              prepend-inner-icon="tabler-lock"
              autocomplete="on"
              type="password"
              placeholder="············"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Checkbox -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
      >
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <!-- 👉 submit and reset button -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>
        <VBtn
          color="secondary"
          type="reset"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`},Ye={ts:`<script lang="ts" setup>
const firstName = ref('')
const lastName = ref('')
const city = ref('')
const country = ref('')
const company = ref('')
const email = ref('')
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <!-- 👉 First Name -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="firstName"
          label="First Name"
          placeholder="John"
        />
      </VCol>

      <!-- 👉 Last Name -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="lastName"
          label="Last Name"
          placeholder="Doe"
        />
      </VCol>

      <!-- 👉 Email -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="email"
          label="Email"
          placeholder="johndoe@email.com"
        />
      </VCol>

      <!-- 👉 City -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="city"
          label="City"
          placeholder="New York"
        />
      </VCol>

      <!-- 👉 Country -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="country"
          label="Country"
          placeholder="United States"
        />
      </VCol>

      <!-- 👉 Company -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="company"
          label="Company"
          placeholder="Pixinvent"
        />
      </VCol>

      <!-- 👉 Remember me -->
      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>

        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`,js:`<script setup>
const firstName = ref('')
const lastName = ref('')
const city = ref('')
const country = ref('')
const company = ref('')
const email = ref('')
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <!-- 👉 First Name -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="firstName"
          label="First Name"
          placeholder="John"
        />
      </VCol>

      <!-- 👉 Last Name -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="lastName"
          label="Last Name"
          placeholder="Doe"
        />
      </VCol>

      <!-- 👉 Email -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="email"
          label="Email"
          placeholder="johndoe@email.com"
        />
      </VCol>

      <!-- 👉 City -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="city"
          label="City"
          placeholder="New York"
        />
      </VCol>

      <!-- 👉 Country -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="country"
          label="Country"
          placeholder="United States"
        />
      </VCol>

      <!-- 👉 Company -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="company"
          label="Company"
          placeholder="Pixinvent"
        />
      </VCol>

      <!-- 👉 Remember me -->
      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>

        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`},Ge={ts:`<script lang="ts" setup>
const firstName = ref('')
const email = ref('')
const mobile = ref<number>()
const password = ref<string>()
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <AppTextField
          v-model="firstName"
          label="First Name"
          placeholder="John"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="email"
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="mobile"
          label="Mobile"
          placeholder="+1 123 456 7890"
          type="number"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="password"
          label="Password"
          autocomplete="on"
          type="password"
          placeholder="············"
        />
      </VCol>

      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>

        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`,js:`<script setup>
const firstName = ref('')
const email = ref('')
const mobile = ref()
const password = ref()
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <AppTextField
          v-model="firstName"
          label="First Name"
          placeholder="John"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="email"
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="mobile"
          label="Mobile"
          placeholder="+1 123 456 7890"
          type="number"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="password"
          label="Password"
          autocomplete="on"
          type="password"
          placeholder="············"
        />
      </VCol>

      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>

        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`},Oe={ts:`<script lang="ts" setup>
const firstName = ref('')
const email = ref('')
const mobile = ref<number>()
const password = ref<string>()
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="{}">
    <VRow>
      <VCol cols="12">
        <AppTextField
          v-model="firstName"
          prepend-inner-icon="tabler-user"
          label="First Name"
          placeholder="John"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="email"
          prepend-inner-icon="tabler-mail"
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="mobile"
          prepend-inner-icon="tabler-device-mobile"
          label="Mobile"
          placeholder="+1 123 456 7890"
          type="number"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="password"
          prepend-inner-icon="tabler-lock"
          label="Password"
          autocomplete="on"
          type="password"
          placeholder="············"
        />
      </VCol>

      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <VCol cols="12">
        <VBtn
          type="submit"
          class="me-2"
        >
          Submit
        </VBtn>

        <VBtn
          color="secondary"
          type="reset"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`,js:`<script setup>
const firstName = ref('')
const email = ref('')
const mobile = ref()
const password = ref()
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="{}">
    <VRow>
      <VCol cols="12">
        <AppTextField
          v-model="firstName"
          prepend-inner-icon="tabler-user"
          label="First Name"
          placeholder="John"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="email"
          prepend-inner-icon="tabler-mail"
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="mobile"
          prepend-inner-icon="tabler-device-mobile"
          label="Mobile"
          placeholder="+1 123 456 7890"
          type="number"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="password"
          prepend-inner-icon="tabler-lock"
          label="Password"
          autocomplete="on"
          type="password"
          placeholder="············"
        />
      </VCol>

      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <VCol cols="12">
        <VBtn
          type="submit"
          class="me-2"
        >
          Submit
        </VBtn>

        <VBtn
          color="secondary"
          type="reset"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`},Hl={__name:"form-layouts",setup(_){return(C,f)=>{const r=je,V=Fe,d=Me,v=Ee,a=ze,s=Be,n=De,p=Pe,b=Se,h=Ue,S=Ne;return A(),q("div",null,[e(w,null,{default:l(()=>[e(o,{cols:"12",md:"6"},{default:l(()=>[e(V,{title:"Horizontal Form",code:$e},{default:l(()=>[e(r)]),_:1},8,["code"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(V,{title:"Horizontal Form with Icons",code:We},{default:l(()=>[e(d)]),_:1},8,["code"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(V,{title:"Vertical Form",code:Ge},{default:l(()=>[e(v)]),_:1},8,["code"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(V,{title:"Vertical Form with Icons",code:Oe},{default:l(()=>[e(a)]),_:1},8,["code"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(V,{title:"Multiple Column",code:Ye},{default:l(()=>[e(s)]),_:1},8,["code"])]),_:1})]),_:1}),e(w,{class:"match-height my-3"},{default:l(()=>[e(o,{cols:"12",md:"6"},{default:l(()=>[e(V,{title:"Form Hint",code:qe},{default:l(()=>[e(n)]),_:1},8,["code"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(V,{title:"Form Validation",code:He},{default:l(()=>[e(p)]),_:1},8,["code"])]),_:1})]),_:1}),e(w,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(V,{title:"Form with Tabs","no-padding":"",code:Je},{default:l(()=>[e(b)]),_:1},8,["code"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[f[0]||(f[0]=c("h4",{class:"text-h6 font-weight-medium mb-5"}," Collapsible Section ",-1)),e(h)]),_:1}),e(o,{cols:"12"},{default:l(()=>[f[1]||(f[1]=c("h4",{class:"text-h6 font-weight-medium mb-5"}," Sticky Section ",-1)),e(S)]),_:1})]),_:1})])}}};export{Hl as default};
