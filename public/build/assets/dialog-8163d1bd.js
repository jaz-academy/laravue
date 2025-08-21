import{_ as q}from"./AppTextField-b5461782.js";import{_ as B}from"./DialogCloseBtn-d4635c5a.js";import{r as g,o as y,f as C,e as a,b as e,aj as d,cT as j,cU as L,v as r,n as c,aV as b,a2 as G,a3 as O,bP as R,ax as H,aJ as W,$,aa as E,d as k,a1 as K,s as Q,c as I,F as N,w as X,a_ as Y,i as Z}from"./main-4585feec.js";import{V as D,a as ee,b as ae}from"./VCard-a267c840.js";import{V}from"./VCardText-dd0c7bc9.js";import{V as U,a as f}from"./VRow-53fd1544.js";import{V as h}from"./VDialog-0dc19d52.js";import{V as le,b as oe}from"./VToolbar-c6982f9b.js";import{V as M}from"./VSpacer-52196579.js";import{V as F,d as J,a as T}from"./VList-4b4f9347.js";import{V as _}from"./VDivider-e2924383.js";import{V as P}from"./VListItemAction-e9579285.js";import{V as S}from"./VCheckbox-d524cee6.js";import{a as te,V as ie}from"./VRadioGroup-ad8debb1.js";import{_ as se}from"./AppCardCode-74786771.js";import"./form-075a7c7b.js";import"./VTextField-d2aea9dd.js";/* empty css                   */import"./VCounter-2f9e53e6.js";import"./VImg-02cfc59c.js";import"./VField-3decac3d.js";import"./easing-9f15041e.js";import"./VInput-3fb3d6fe.js";import"./forwardRefs-8348545e.js";import"./VAvatar-fa9fec94.js";import"./VOverlay-27dbbcf8.js";import"./lazy-3e6a3ff5.js";import"./scopeId-326ce56f.js";import"./dialog-transition-a9ebe0dc.js";import"./ssrBoot-7fdf6b89.js";import"./VCheckboxBtn-42d04193.js";import"./VSelectionControl-272cc15c.js";const re={__name:"DemoDialogForm",setup(v){const t=g(!1),s=g(""),l=g(""),o=g(""),i=g(""),m=g(""),p=g(),x=g([]);return(z,n)=>{const A=B,w=q;return y(),C(h,{modelValue:c(t),"onUpdate:modelValue":n[10]||(n[10]=u=>b(t)?t.value=u:null),"max-width":"600"},{activator:a(({props:u})=>[e(d,j(L(u)),{default:a(()=>n[11]||(n[11]=[r(" Open Dialog ")])),_:2},1040)]),default:a(()=>[e(A,{onClick:n[0]||(n[0]=u=>t.value=!c(t))}),e(D,{title:"User Profile"},{default:a(()=>[e(V,null,{default:a(()=>[e(U,null,{default:a(()=>[e(f,{cols:"12",sm:"6",md:"4"},{default:a(()=>[e(w,{modelValue:c(s),"onUpdate:modelValue":n[1]||(n[1]=u=>b(s)?s.value=u:null),label:"First Name",placeholder:"John"},null,8,["modelValue"])]),_:1}),e(f,{cols:"12",sm:"6",md:"4"},{default:a(()=>[e(w,{modelValue:c(l),"onUpdate:modelValue":n[2]||(n[2]=u=>b(l)?l.value=u:null),label:"Middle Name",placeholder:"peter"},null,8,["modelValue"])]),_:1}),e(f,{cols:"12",sm:"6",md:"4"},{default:a(()=>[e(w,{modelValue:c(o),"onUpdate:modelValue":n[3]||(n[3]=u=>b(o)?o.value=u:null),label:"Last Name","persistent-hint":"",placeholder:"Doe"},null,8,["modelValue"])]),_:1}),e(f,{cols:"12"},{default:a(()=>[e(w,{modelValue:c(i),"onUpdate:modelValue":n[4]||(n[4]=u=>b(i)?i.value=u:null),label:"Email",placeholder:"johndoe@email.com"},null,8,["modelValue"])]),_:1}),e(f,{cols:"12"},{default:a(()=>[e(w,{modelValue:c(m),"onUpdate:modelValue":n[5]||(n[5]=u=>b(m)?m.value=u:null),label:"Password",autocomplete:"on",type:"password",placeholder:"············"},null,8,["modelValue"])]),_:1}),e(f,{cols:"12",sm:"6"},{default:a(()=>[e(w,{modelValue:c(p),"onUpdate:modelValue":n[6]||(n[6]=u=>b(p)?p.value=u:null),label:"Age",type:"number",placeholder:"18"},null,8,["modelValue"])]),_:1}),e(f,{cols:"12",sm:"6"},{default:a(()=>[e(w,{modelValue:c(x),"onUpdate:modelValue":n[7]||(n[7]=u=>b(x)?x.value=u:null),label:"Interests",placeholder:"Sports, Music, Movies"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(V,{class:"d-flex justify-end flex-wrap gap-3"},{default:a(()=>[e(d,{variant:"tonal",color:"secondary",onClick:n[8]||(n[8]=u=>t.value=!1)},{default:a(()=>n[12]||(n[12]=[r(" Close ")])),_:1}),e(d,{onClick:n[9]||(n[9]=u=>t.value=!1)},{default:a(()=>n[13]||(n[13]=[r(" Save ")])),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])}}};const ne=G({...O(),...R({variant:"text"})},"VToolbarItems"),ce=H()({name:"VToolbarItems",props:ne(),setup(v,t){let{slots:s}=t;return W({VBtn:{color:$(v,"color"),height:"inherit",variant:$(v,"variant")}}),E(()=>{var l;return e("div",{class:["v-toolbar-items",v.class],style:v.style},[(l=s.default)==null?void 0:l.call(s)])}),{}}}),de={__name:"DemoDialogFullscreen",setup(v){const t=g(!1);return(s,l)=>(y(),C(h,{modelValue:c(t),"onUpdate:modelValue":l[2]||(l[2]=o=>b(t)?t.value=o:null),fullscreen:"",scrim:!1,transition:"dialog-bottom-transition"},{activator:a(({props:o})=>[e(d,j(L(o)),{default:a(()=>l[3]||(l[3]=[r(" Open Dialog ")])),_:2},1040)]),default:a(()=>[e(D,null,{default:a(()=>[k("div",null,[e(le,{color:"primary"},{default:a(()=>[e(d,{icon:"",variant:"plain",onClick:l[0]||(l[0]=o=>t.value=!1)},{default:a(()=>[e(K,{color:"white",icon:"tabler-x"})]),_:1}),e(oe,null,{default:a(()=>l[4]||(l[4]=[r("Settings")])),_:1}),e(M),e(ce,null,{default:a(()=>[e(d,{variant:"text",onClick:l[1]||(l[1]=o=>t.value=!1)},{default:a(()=>l[5]||(l[5]=[r(" Save ")])),_:1})]),_:1})]),_:1})]),e(F,{lines:"two"},{default:a(()=>[e(J,null,{default:a(()=>l[6]||(l[6]=[r("User Controls")])),_:1}),e(T,{title:"Content filtering",subtitle:"Set the content filtering level to restrict apps that can be downloaded"}),e(T,{title:"Password",subtitle:"Require password for purchase or use password to restrict purchase"})]),_:1}),e(_),e(F,{lines:"two","select-strategy":"classic",class:"full-screen-dialog-list"},{default:a(()=>[e(J,null,{default:a(()=>l[7]||(l[7]=[r("General")])),_:1}),e(T,{title:"Notifications",subtitle:"Notify me about updates to apps or games that I downloaded",value:"Notifications"},{prepend:a(({isActive:o})=>[e(P,{start:""},{default:a(()=>[e(S,{"model-value":o,color:"primary"},null,8,["model-value"])]),_:2},1024)]),_:1}),e(T,{title:"Sound",subtitle:"Auto-update apps at any time. Data charges may apply",value:"Sound"},{prepend:a(({isActive:o})=>[e(P,{start:""},{default:a(()=>[e(S,{"model-value":o,color:"primary"},null,8,["model-value"])]),_:2},1024)]),_:1}),e(T,{title:"Auto-add widgets",subtitle:"Automatically add home screen widgets",value:"Auto-add widgets"},{prepend:a(({isActive:o})=>[e(P,{start:""},{default:a(()=>[e(S,{"model-value":o,color:"primary"},null,8,["model-value"])]),_:2},1024)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]))}},ue={__name:"DemoDialogOverflowed",setup(v){const t=g(!1);return(s,l)=>{const o=B;return y(),C(h,{modelValue:c(t),"onUpdate:modelValue":l[3]||(l[3]=i=>b(t)?t.value=i:null),class:"v-dialog-sm"},{activator:a(({props:i})=>[e(d,Q({color:"primary"},i),{default:a(()=>l[4]||(l[4]=[r(" Open Dialog ")])),_:2},1040)]),default:a(()=>[e(o,{onClick:l[0]||(l[0]=i=>t.value=!c(t))}),e(D,{title:"Use Google's location service?"},{default:a(()=>[e(V,null,{default:a(()=>l[5]||(l[5]=[r(" Bear claw pastry cotton candy jelly toffee. Pudding chocolate cake shortbread bonbon biscuit sweet. Lemon drops cupcake muffin brownie fruitcake. Pastry pastry tootsie roll jujubes chocolate cake gummi bears muffin pudding caramels. Jujubes lollipop gummies croissant shortbread. Cupcake dessert marzipan topping gingerbread apple pie chupa chups powder. Cake croissant halvah candy canes gummies. Candy tootsie roll sweet lemon drops tart cotton candy jujubes topping chupa chups. Biscuit icing pastry chocolate bar lollipop. Lemon drops oat cake chocolate cake dessert chocolate. Carrot cake ice cream bonbon tart tootsie roll cupcake dessert gingerbread. Apple pie dessert sweet candy bonbon. Sugar plum gummies powder brownie dessert candy canes candy canes candy. Sweet liquorice danish jujubes tart marshmallow cake. Danish chocolate bar icing dessert bonbon. Chocolate liquorice candy donut shortbread bonbon jujubes tart. Marshmallow cupcake marzipan icing pie dragée toffee. Cupcake soufflé pastry oat cake icing sesame snaps oat cake. Lollipop cheesecake cake tiramisu chocolate cake croissant. Donut candy canes sweet roll ice cream toffee gingerbread. Jelly-o biscuit oat cake cheesecake jujubes. Pudding chocolate biscuit gummies sesame snaps. Lemon drops candy canes chupa chups pudding muffin jujubes cupcake danish. Wafer chocolate oat cake sweet chocolate muffin. Pie dragée soufflé oat cake toffee dragée gummi bears. Jelly-o chocolate jelly fruitcake tart muffin icing sweet. Gummies pie lollipop carrot cake gingerbread sweet. Marshmallow tiramisu chocolate cake cake marshmallow. Pudding fruitcake shortbread biscuit powder cake. Dragée cookie cheesecake chupa chups toffee wafer. Wafer donut pudding chocolate shortbread cheesecake. Cupcake sweet roll lollipop chupa chups donut croissant carrot cake chocolate cake. Toffee soufflé biscuit gingerbread fruitcake. Jelly beans pudding jelly-o gingerbread apple pie ice cream. Muffin halvah cookie topping muffin sugar plum. Bonbon dessert cake tiramisu marzipan apple pie. Jelly beans caramels icing cake cake tiramisu dessert dessert jelly-o. Halvah ice cream cotton candy chupa chups cheesecake pudding cheesecake cupcake gummies. Croissant cookie candy canes cake chocolate. Pie cotton candy caramels sweet cake liquorice. Bear claw oat cake candy danish jelly-o fruitcake muffin sugar plum cupcake. Pudding cake cake lollipop chupa chups topping apple pie jelly oat cake. Pie candy canes tiramisu gummies icing cotton candy fruitcake marshmallow dragée. Pudding caramels muffin cookie cookie cupcake brownie ice cream. Liquorice lemon drops lemon drops cotton candy biscuit jelly-o jujubes topping. Lemon drops sweet dragée dessert sugar plum chocolate topping sugar plum oat cake. Muffin candy canes bonbon cotton candy liquorice gingerbread sesame snaps chocolate bar. Muffin gingerbread sesame snaps cake donut pie gingerbread soufflé croissant. Topping tart shortbread toffee jelly-o gingerbread cheesecake cupcake cake. Pudding powder icing marshmallow bear claw sesame snaps carrot cake. Jelly beans dessert tiramisu shortbread gummi bears gummies cotton candy. Tiramisu liquorice cookie pastry caramels icing tootsie roll. Pudding croissant tootsie roll jelly-o jelly beans gummi bears. Shortbread candy canes biscuit candy donut marshmallow candy canes. Fruitcake marshmallow chocolate bar sweet roll tart gummi bears brownie cupcake dragée. Cheesecake gummies sesame snaps soufflé jelly beans halvah bonbon tootsie roll. Sesame snaps marzipan cupcake candy cheesecake lollipop. Donut candy jelly-o liquorice topping gummi bears halvah. Pie sweet sweet jujubes bear claw marshmallow pudding lollipop tiramisu. Tiramisu tootsie roll topping chocolate cake tootsie roll cotton candy brownie. Jelly beans biscuit caramels cake toffee toffee lemon drops dessert. Toffee chupa chups tart bonbon brownie cake shortbread. Gummies marshmallow topping dragée chocolate bar. Chupa chups donut cheesecake cookie fruitcake muffin. Jelly-o cupcake cheesecake chocolate bar cupcake wafer. Liquorice muffin marzipan cotton candy cake lemon drops cake brownie. ")])),_:1}),e(V,{class:"d-flex justify-end flex-wrap gap-3"},{default:a(()=>[e(d,{color:"secondary",variant:"tonal",onClick:l[1]||(l[1]=i=>t.value=!1)},{default:a(()=>l[6]||(l[6]=[r(" Disagree ")])),_:1}),e(d,{onClick:l[2]||(l[2]=i=>t.value=!1)},{default:a(()=>l[7]||(l[7]=[r(" Agree ")])),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])}}},pe={__name:"DemoDialogNesting",setup(v){const t=g(!1),s=g(!1);return(l,o)=>{const i=B;return y(),I(N,null,[e(d,{onClick:o[0]||(o[0]=m=>t.value=!0)},{default:a(()=>o[8]||(o[8]=[r(" Open Dialog ")])),_:1}),e(h,{modelValue:c(t),"onUpdate:modelValue":o[4]||(o[4]=m=>b(t)?t.value=m:null),class:"v-dialog-sm"},{default:a(()=>[e(i,{onClick:o[1]||(o[1]=m=>t.value=!1)}),e(D,{title:"Dialog"},{default:a(()=>[e(V,null,{default:a(()=>o[9]||(o[9]=[r(" Biscuit fruitcake marshmallow jelly beans jujubes halvah cupcake topping. Chocolate cookie jelly-o toffee tart oat cake. Tart sugar plum gingerbread halvah muffin sweet. Cake halvah tart soufflé pudding. ")])),_:1}),e(V,{class:"d-flex justify-end flex-wrap gap-3"},{default:a(()=>[e(d,{variant:"tonal",color:"secondary",onClick:o[2]||(o[2]=m=>t.value=!1)},{default:a(()=>o[10]||(o[10]=[r(" Close ")])),_:1}),e(d,{onClick:o[3]||(o[3]=m=>s.value=!c(s))},{default:a(()=>o[11]||(o[11]=[r(" Open Dialog 2 ")])),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(h,{modelValue:c(s),"onUpdate:modelValue":o[7]||(o[7]=m=>b(s)?s.value=m:null),class:"v-dialog-sm"},{default:a(()=>[e(i,{onClick:o[5]||(o[5]=m=>s.value=!1)}),e(D,{title:"Dialog 2"},{default:a(()=>[e(V,null,{default:a(()=>o[12]||(o[12]=[r("I'm a nested dialog.")])),_:1}),e(V,{class:"d-flex flex-wrap gap-3"},{default:a(()=>[e(M),e(d,{onClick:o[6]||(o[6]=m=>s.value=!1)},{default:a(()=>o[13]||(o[13]=[r(" Close ")])),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}}},me={__name:"DemoDialogLoader",setup(v){const t=g(!1);return X(t,s=>{s&&setTimeout(()=>{t.value=!1},4e3)}),(s,l)=>(y(),I(N,null,[e(d,{disabled:c(t),onClick:l[0]||(l[0]=o=>t.value=!0)},{default:a(()=>l[2]||(l[2]=[r(" Start loading ")])),_:1},8,["disabled"]),e(h,{modelValue:c(t),"onUpdate:modelValue":l[1]||(l[1]=o=>b(t)?t.value=o:null),width:"300"},{default:a(()=>[e(D,{color:"primary",width:"300"},{default:a(()=>[e(V,{class:"pt-3"},{default:a(()=>[l[3]||(l[3]=r(" Please stand by ")),e(Y,{indeterminate:"",color:"white",height:8,class:"mb-0 mt-4"})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}};const ge={__name:"DemoDialogScrollable",setup(v){const t=[{label:"Bahamas, The",value:"bahamas"},{label:"Bahrain",value:"bahrain"},{label:"Bangladesh",value:"bangladesh"},{label:"Barbados",value:"barbados"},{label:"Belarus",value:"belarus"},{label:"Belgium",value:"belgium"},{label:"Belize",value:"belize"},{label:"Benin",value:"benin"},{label:"Bhutan",value:"bhutan"},{label:"Bolivia",value:"bolivia"},{label:"Bosnia and Herzegovina",value:"bosnia"},{label:"Botswana",value:"botswana"},{label:"Brazil",value:"brazil"},{label:"Brunei",value:"brunei"},{label:"Bulgaria",value:"bulgaria"},{label:"Burkina Faso",value:"burkina"}],s=g(""),l=g(!1);return(o,i)=>{const m=B;return y(),C(h,{modelValue:c(l),"onUpdate:modelValue":i[4]||(i[4]=p=>b(l)?l.value=p:null),scrollable:"","max-width":"350","content-class":"scrollable-dialog"},{activator:a(({props:p})=>[e(d,j(L(p)),{default:a(()=>i[5]||(i[5]=[r(" Open Dialog ")])),_:2},1040)]),default:a(()=>[e(m,{onClick:i[0]||(i[0]=p=>l.value=!c(l))}),e(D,null,{default:a(()=>[e(ee,{class:"pb-5"},{default:a(()=>[e(ae,null,{default:a(()=>i[6]||(i[6]=[r("Select Country")])),_:1})]),_:1}),e(_),e(V,{style:{"block-size":"300px"}},{default:a(()=>[e(te,{modelValue:c(s),"onUpdate:modelValue":i[1]||(i[1]=p=>b(s)?s.value=p:null),inline:!1},{default:a(()=>[(y(),I(N,null,Z(t,p=>e(ie,{key:p.label,label:p.label,value:p.value,color:"primary"},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),_:1}),e(_),e(V,{class:"d-flex justify-end flex-wrap gap-3 pt-5"},{default:a(()=>[e(d,{color:"secondary",variant:"tonal",onClick:i[2]||(i[2]=p=>l.value=!1)},{default:a(()=>i[7]||(i[7]=[r(" Close ")])),_:1}),e(d,{onClick:i[3]||(i[3]=p=>l.value=!1)},{default:a(()=>i[8]||(i[8]=[r(" Save ")])),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])}}},be={__name:"DemoDialogPersistent",setup(v){const t=g(!1);return(s,l)=>{const o=B;return y(),C(h,{modelValue:c(t),"onUpdate:modelValue":l[3]||(l[3]=i=>b(t)?t.value=i:null),persistent:"",class:"v-dialog-sm"},{activator:a(({props:i})=>[e(d,j(L(i)),{default:a(()=>l[4]||(l[4]=[r(" Open Dialog ")])),_:2},1040)]),default:a(()=>[e(o,{onClick:l[0]||(l[0]=i=>t.value=!c(t))}),e(D,{title:"Use Google's location service?"},{default:a(()=>[e(V,null,{default:a(()=>l[5]||(l[5]=[r(" Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running. ")])),_:1}),e(V,{class:"d-flex justify-end gap-3 flex-wrap"},{default:a(()=>[e(d,{color:"secondary",variant:"tonal",onClick:l[1]||(l[1]=i=>t.value=!1)},{default:a(()=>l[6]||(l[6]=[r(" Disagree ")])),_:1}),e(d,{onClick:l[2]||(l[2]=i=>t.value=!1)},{default:a(()=>l[7]||(l[7]=[r(" Agree ")])),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])}}},fe={__name:"DemoDialogBasic",setup(v){const t=g(!1);return(s,l)=>{const o=B;return y(),C(h,{modelValue:c(t),"onUpdate:modelValue":l[2]||(l[2]=i=>b(t)?t.value=i:null),width:"500"},{activator:a(({props:i})=>[e(d,j(L(i)),{default:a(()=>l[3]||(l[3]=[r(" Click Me ")])),_:2},1040)]),default:a(()=>[e(o,{onClick:l[0]||(l[0]=i=>t.value=!c(t))}),e(D,{title:"Privacy Policy"},{default:a(()=>[e(V,null,{default:a(()=>l[4]||(l[4]=[r(" Bear claw pastry cotton candy jelly toffee. Pudding chocolate cake shortbread bonbon biscuit sweet. Lemon drops cupcake muffin brownie fruitcake. Pastry pastry tootsie roll jujubes chocolate cake gummi bears muffin pudding caramels. Jujubes lollipop gummies croissant shortbread. Cupcake dessert marzipan topping gingerbread apple pie chupa chups powder. Cake croissant halvah candy canes gummies. ")])),_:1}),e(V,{class:"d-flex justify-end"},{default:a(()=>[e(d,{onClick:l[1]||(l[1]=i=>t.value=!1)},{default:a(()=>l[5]||(l[5]=[r(" I accept ")])),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])}}},Ve={ts:`<script lang="ts" setup>
const isDialogVisible = ref(false)
<\/script>

<template>
  <VDialog
    v-model="isDialogVisible"
    width="500"
  >
    <!-- Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Click Me
      </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="Privacy Policy">
      <VCardText>
        Bear claw pastry cotton candy jelly toffee. Pudding chocolate cake shortbread bonbon biscuit sweet. Lemon drops cupcake muffin brownie fruitcake. Pastry pastry tootsie roll jujubes chocolate cake gummi bears muffin pudding caramels. Jujubes lollipop gummies croissant shortbread. Cupcake dessert marzipan topping gingerbread apple pie chupa chups powder. Cake croissant halvah candy canes gummies.
      </VCardText>

      <VCardText class="d-flex justify-end">
        <VBtn @click="isDialogVisible = false">
          I accept
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
`,js:`<script setup>
const isDialogVisible = ref(false)
<\/script>

<template>
  <VDialog
    v-model="isDialogVisible"
    width="500"
  >
    <!-- Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Click Me
      </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="Privacy Policy">
      <VCardText>
        Bear claw pastry cotton candy jelly toffee. Pudding chocolate cake shortbread bonbon biscuit sweet. Lemon drops cupcake muffin brownie fruitcake. Pastry pastry tootsie roll jujubes chocolate cake gummi bears muffin pudding caramels. Jujubes lollipop gummies croissant shortbread. Cupcake dessert marzipan topping gingerbread apple pie chupa chups powder. Cake croissant halvah candy canes gummies.
      </VCardText>

      <VCardText class="d-flex justify-end">
        <VBtn @click="isDialogVisible = false">
          I accept
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
`},ve={ts:`<script lang="ts" setup>
const isDialogVisible = ref(false)
const firstName = ref('')
const middleName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const age = ref()
const interest = ref<string[]>([])
<\/script>

<template>
  <VDialog
    v-model="isDialogVisible"
    max-width="600"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Open Dialog
      </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="User Profile">
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <AppTextField
              v-model="firstName"
              label="First Name"
              placeholder="John"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <AppTextField
              v-model="middleName"
              label="Middle Name"
              placeholder="peter"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <AppTextField
              v-model="lastName"
              label="Last Name"
              persistent-hint
              placeholder="Doe"
            />
          </VCol>
          <VCol cols="12">
            <AppTextField
              v-model="email"
              label="Email"
              placeholder="johndoe@email.com"
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
          <VCol
            cols="12"
            sm="6"
          >
            <AppTextField
              v-model="age"
              label="Age"
              type="number"
              placeholder="18"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
          >
            <AppTextField
              v-model="interest"
              label="Interests"
              placeholder="Sports, Music, Movies"
            />
          </VCol>
        </VRow>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn
          variant="tonal"
          color="secondary"
          @click="isDialogVisible = false"
        >
          Close
        </VBtn>
        <VBtn @click="isDialogVisible = false">
          Save
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
`,js:`<script setup>
const isDialogVisible = ref(false)
const firstName = ref('')
const middleName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const age = ref()
const interest = ref([])
<\/script>

<template>
  <VDialog
    v-model="isDialogVisible"
    max-width="600"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Open Dialog
      </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="User Profile">
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <AppTextField
              v-model="firstName"
              label="First Name"
              placeholder="John"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <AppTextField
              v-model="middleName"
              label="Middle Name"
              placeholder="peter"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <AppTextField
              v-model="lastName"
              label="Last Name"
              persistent-hint
              placeholder="Doe"
            />
          </VCol>
          <VCol cols="12">
            <AppTextField
              v-model="email"
              label="Email"
              placeholder="johndoe@email.com"
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
          <VCol
            cols="12"
            sm="6"
          >
            <AppTextField
              v-model="age"
              label="Age"
              type="number"
              placeholder="18"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
          >
            <AppTextField
              v-model="interest"
              label="Interests"
              placeholder="Sports, Music, Movies"
            />
          </VCol>
        </VRow>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn
          variant="tonal"
          color="secondary"
          @click="isDialogVisible = false"
        >
          Close
        </VBtn>
        <VBtn @click="isDialogVisible = false">
          Save
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
`},ke={ts:`<script lang="ts" setup>
const isDialogVisible = ref(false)
<\/script>

<template>
  <VDialog
    v-model="isDialogVisible"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Open Dialog
      </VBtn>
    </template>

    <!-- Dialog Content -->
    <VCard>
      <!-- Toolbar -->
      <div>
        <VToolbar color="primary">
          <VBtn
            icon
            variant="plain"
            @click="isDialogVisible = false"
          >
            <VIcon
              color="white"
              icon="tabler-x"
            />
          </VBtn>

          <VToolbarTitle>Settings</VToolbarTitle>

          <VSpacer />

          <VToolbarItems>
            <VBtn
              variant="text"
              @click="isDialogVisible = false"
            >
              Save
            </VBtn>
          </VToolbarItems>
        </VToolbar>
      </div>

      <!-- List -->
      <VList lines="two">
        <VListSubheader>User Controls</VListSubheader>
        <VListItem
          title="Content filtering"
          subtitle="Set the content filtering level to restrict apps that can be downloaded"
        />
        <VListItem
          title="Password"
          subtitle="Require password for purchase or use password to restrict purchase"
        />
      </VList>

      <VDivider />

      <!-- List -->
      <VList
        lines="two"
        select-strategy="classic"
        class="full-screen-dialog-list"
      >
        <VListSubheader>General</VListSubheader>

        <VListItem
          title="Notifications"
          subtitle="Notify me about updates to apps or games that I downloaded"
          value="Notifications"
        >
          <template #prepend="{ isActive }">
            <VListItemAction start>
              <VCheckbox
                :model-value="isActive"
                color="primary"
              />
            </VListItemAction>
          </template>
        </VListItem>

        <VListItem
          title="Sound"
          subtitle="Auto-update apps at any time. Data charges may apply"
          value="Sound"
        >
          <template #prepend="{ isActive }">
            <VListItemAction start>
              <VCheckbox
                :model-value="isActive"
                color="primary"
              />
            </VListItemAction>
          </template>
        </VListItem>

        <VListItem
          title="Auto-add widgets"
          subtitle="Automatically add home screen widgets"
          value="Auto-add widgets"
        >
          <template #prepend="{ isActive }">
            <VListItemAction start>
              <VCheckbox
                :model-value="isActive"
                color="primary"
              />
            </VListItemAction>
          </template>
        </VListItem>
      </VList>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}

.full-screen-dialog-list{
  .v-list-item[tabindex="-2"].v-list-item--active{
    .v-list-item-action{
      .v-icon{
        color: #fff;
      }
    }
  }

}
</style>
`,js:`<script setup>
const isDialogVisible = ref(false)
<\/script>

<template>
  <VDialog
    v-model="isDialogVisible"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Open Dialog
      </VBtn>
    </template>

    <!-- Dialog Content -->
    <VCard>
      <!-- Toolbar -->
      <div>
        <VToolbar color="primary">
          <VBtn
            icon
            variant="plain"
            @click="isDialogVisible = false"
          >
            <VIcon
              color="white"
              icon="tabler-x"
            />
          </VBtn>

          <VToolbarTitle>Settings</VToolbarTitle>

          <VSpacer />

          <VToolbarItems>
            <VBtn
              variant="text"
              @click="isDialogVisible = false"
            >
              Save
            </VBtn>
          </VToolbarItems>
        </VToolbar>
      </div>

      <!-- List -->
      <VList lines="two">
        <VListSubheader>User Controls</VListSubheader>
        <VListItem
          title="Content filtering"
          subtitle="Set the content filtering level to restrict apps that can be downloaded"
        />
        <VListItem
          title="Password"
          subtitle="Require password for purchase or use password to restrict purchase"
        />
      </VList>

      <VDivider />

      <!-- List -->
      <VList
        lines="two"
        select-strategy="classic"
        class="full-screen-dialog-list"
      >
        <VListSubheader>General</VListSubheader>

        <VListItem
          title="Notifications"
          subtitle="Notify me about updates to apps or games that I downloaded"
          value="Notifications"
        >
          <template #prepend="{ isActive }">
            <VListItemAction start>
              <VCheckbox
                :model-value="isActive"
                color="primary"
              />
            </VListItemAction>
          </template>
        </VListItem>

        <VListItem
          title="Sound"
          subtitle="Auto-update apps at any time. Data charges may apply"
          value="Sound"
        >
          <template #prepend="{ isActive }">
            <VListItemAction start>
              <VCheckbox
                :model-value="isActive"
                color="primary"
              />
            </VListItemAction>
          </template>
        </VListItem>

        <VListItem
          title="Auto-add widgets"
          subtitle="Automatically add home screen widgets"
          value="Auto-add widgets"
        >
          <template #prepend="{ isActive }">
            <VListItemAction start>
              <VCheckbox
                :model-value="isActive"
                color="primary"
              />
            </VListItemAction>
          </template>
        </VListItem>
      </VList>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}

.full-screen-dialog-list{
  .v-list-item[tabindex="-2"].v-list-item--active{
    .v-list-item-action{
      .v-icon{
        color: #fff;
      }
    }
  }

}
</style>
`},ye={ts:`<script lang="ts" setup>
const isDialogVisible = ref(false)

watch(isDialogVisible, value => {
  if (!value)
    return

  setTimeout(() => {
    isDialogVisible.value = false
  }, 4000)
})
<\/script>

<template>
  <!-- Dialog Activator -->
  <VBtn
    :disabled="isDialogVisible"
    @click="isDialogVisible = true"
  >
    Start loading
  </VBtn>

  <!-- Dialog -->
  <VDialog
    v-model="isDialogVisible"
    width="300"
  >
    <VCard
      color="primary"
      width="300"
    >
      <VCardText class="pt-3">
        Please stand by
        <VProgressLinear
          indeterminate
          color="white"
          :height="8"
          class="mb-0 mt-4"
        />
      </VCardText>
    </VCard>
  </VDialog>
</template>
`,js:`<script setup>
const isDialogVisible = ref(false)

watch(isDialogVisible, value => {
  if (!value)
    return
  setTimeout(() => {
    isDialogVisible.value = false
  }, 4000)
})
<\/script>

<template>
  <!-- Dialog Activator -->
  <VBtn
    :disabled="isDialogVisible"
    @click="isDialogVisible = true"
  >
    Start loading
  </VBtn>

  <!-- Dialog -->
  <VDialog
    v-model="isDialogVisible"
    width="300"
  >
    <VCard
      color="primary"
      width="300"
    >
      <VCardText class="pt-3">
        Please stand by
        <VProgressLinear
          indeterminate
          color="white"
          :height="8"
          class="mb-0 mt-4"
        />
      </VCardText>
    </VCard>
  </VDialog>
</template>
`},De={ts:`<script lang="ts" setup>
const isDialogVisible = ref(false)
const isDialogTwoShow = ref(false)
<\/script>

<template>
  <VBtn @click="isDialogVisible = true">
    Open Dialog
  </VBtn>

  <!-- Dialog -->
  <VDialog
    v-model="isDialogVisible"
    class="v-dialog-sm"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = false" />

    <VCard title="Dialog">
      <VCardText>
        Biscuit fruitcake marshmallow jelly beans jujubes halvah cupcake topping. Chocolate cookie jelly-o toffee tart oat cake. Tart sugar plum gingerbread halvah muffin sweet. Cake halvah tart soufflé pudding.
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn
          variant="tonal"
          color="secondary"
          @click="isDialogVisible = false"
        >
          Close
        </VBtn>
        <VBtn @click="isDialogTwoShow = !isDialogTwoShow">
          Open Dialog 2
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>

  <!-- Dialog 2 -->
  <VDialog
    v-model="isDialogTwoShow"
    class="v-dialog-sm"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogTwoShow = false" />

    <VCard title="Dialog 2">
      <VCardText>I'm a nested dialog.</VCardText>
      <VCardText class="d-flex flex-wrap gap-3">
        <VSpacer />
        <VBtn @click="isDialogTwoShow = false">
          Close
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
`,js:`<script setup>
const isDialogVisible = ref(false)
const isDialogTwoShow = ref(false)
<\/script>

<template>
  <VBtn @click="isDialogVisible = true">
    Open Dialog
  </VBtn>

  <!-- Dialog -->
  <VDialog
    v-model="isDialogVisible"
    class="v-dialog-sm"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = false" />

    <VCard title="Dialog">
      <VCardText>
        Biscuit fruitcake marshmallow jelly beans jujubes halvah cupcake topping. Chocolate cookie jelly-o toffee tart oat cake. Tart sugar plum gingerbread halvah muffin sweet. Cake halvah tart soufflé pudding.
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn
          variant="tonal"
          color="secondary"
          @click="isDialogVisible = false"
        >
          Close
        </VBtn>
        <VBtn @click="isDialogTwoShow = !isDialogTwoShow">
          Open Dialog 2
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>

  <!-- Dialog 2 -->
  <VDialog
    v-model="isDialogTwoShow"
    class="v-dialog-sm"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogTwoShow = false" />

    <VCard title="Dialog 2">
      <VCardText>I'm a nested dialog.</VCardText>
      <VCardText class="d-flex flex-wrap gap-3">
        <VSpacer />
        <VBtn @click="isDialogTwoShow = false">
          Close
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
`},he={ts:`<script lang="ts" setup>
const isDialogVisible = ref(false)
<\/script>

<template>
  <VDialog
    v-model="isDialogVisible"
    class="v-dialog-sm"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn
        color="primary"
        v-bind="props"
      >
        Open Dialog
      </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="Use Google's location service?">
      <VCardText>
        Bear claw pastry cotton candy jelly toffee. Pudding chocolate cake shortbread bonbon biscuit sweet. Lemon drops cupcake muffin brownie fruitcake. Pastry pastry tootsie roll jujubes chocolate cake gummi bears muffin pudding caramels. Jujubes lollipop gummies croissant shortbread. Cupcake dessert marzipan topping gingerbread apple pie chupa chups powder. Cake croissant halvah candy canes gummies. Candy tootsie roll sweet lemon drops tart cotton candy jujubes topping chupa chups. Biscuit icing pastry chocolate bar lollipop. Lemon drops oat cake chocolate cake dessert chocolate. Carrot cake ice cream bonbon tart tootsie roll cupcake dessert gingerbread. Apple pie dessert sweet candy bonbon. Sugar plum gummies powder brownie dessert candy canes candy canes candy.

        Sweet liquorice danish jujubes tart marshmallow cake. Danish chocolate bar icing dessert bonbon. Chocolate liquorice candy donut shortbread bonbon jujubes tart. Marshmallow cupcake marzipan icing pie dragée toffee. Cupcake soufflé pastry oat cake icing sesame snaps oat cake. Lollipop cheesecake cake tiramisu chocolate cake croissant. Donut candy canes sweet roll ice cream toffee gingerbread. Jelly-o biscuit oat cake cheesecake jujubes. Pudding chocolate biscuit gummies sesame snaps. Lemon drops candy canes chupa chups pudding muffin jujubes cupcake danish. Wafer chocolate oat cake sweet chocolate muffin. Pie dragée soufflé oat cake toffee dragée gummi bears. Jelly-o chocolate jelly fruitcake tart muffin icing sweet.

        Gummies pie lollipop carrot cake gingerbread sweet. Marshmallow tiramisu chocolate cake cake marshmallow. Pudding fruitcake shortbread biscuit powder cake. Dragée cookie cheesecake chupa chups toffee wafer. Wafer donut pudding chocolate shortbread cheesecake. Cupcake sweet roll lollipop chupa chups donut croissant carrot cake chocolate cake. Toffee soufflé biscuit gingerbread fruitcake. Jelly beans pudding jelly-o gingerbread apple pie ice cream. Muffin halvah cookie topping muffin sugar plum. Bonbon dessert cake tiramisu marzipan apple pie. Jelly beans caramels icing cake cake tiramisu dessert dessert jelly-o. Halvah ice cream cotton candy chupa chups cheesecake pudding cheesecake cupcake gummies. Croissant cookie candy canes cake chocolate.

        Pie cotton candy caramels sweet cake liquorice. Bear claw oat cake candy danish jelly-o fruitcake muffin sugar plum cupcake. Pudding cake cake lollipop chupa chups topping apple pie jelly oat cake. Pie candy canes tiramisu gummies icing cotton candy fruitcake marshmallow dragée. Pudding caramels muffin cookie cookie cupcake brownie ice cream. Liquorice lemon drops lemon drops cotton candy biscuit jelly-o jujubes topping. Lemon drops sweet dragée dessert sugar plum chocolate topping sugar plum oat cake. Muffin candy canes bonbon cotton candy liquorice gingerbread sesame snaps chocolate bar. Muffin gingerbread sesame snaps cake donut pie gingerbread soufflé croissant. Topping tart shortbread toffee jelly-o gingerbread cheesecake cupcake cake. Pudding powder icing marshmallow bear claw sesame snaps carrot cake. Jelly beans dessert tiramisu shortbread gummi bears gummies cotton candy. Tiramisu liquorice cookie pastry caramels icing tootsie roll.

        Pudding croissant tootsie roll jelly-o jelly beans gummi bears. Shortbread candy canes biscuit candy donut marshmallow candy canes. Fruitcake marshmallow chocolate bar sweet roll tart gummi bears brownie cupcake dragée. Cheesecake gummies sesame snaps soufflé jelly beans halvah bonbon tootsie roll. Sesame snaps marzipan cupcake candy cheesecake lollipop. Donut candy jelly-o liquorice topping gummi bears halvah. Pie sweet sweet jujubes bear claw marshmallow pudding lollipop tiramisu. Tiramisu tootsie roll topping chocolate cake tootsie roll cotton candy brownie. Jelly beans biscuit caramels cake toffee toffee lemon drops dessert. Toffee chupa chups tart bonbon brownie cake shortbread. Gummies marshmallow topping dragée chocolate bar. Chupa chups donut cheesecake cookie fruitcake muffin. Jelly-o cupcake cheesecake chocolate bar cupcake wafer. Liquorice muffin marzipan cotton candy cake lemon drops cake brownie.
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn
          color="secondary"
          variant="tonal"
          @click="isDialogVisible = false"
        >
          Disagree
        </VBtn>
        <VBtn @click="isDialogVisible = false">
          Agree
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
`,js:`<script setup>
const isDialogVisible = ref(false)
<\/script>

<template>
  <VDialog
    v-model="isDialogVisible"
    class="v-dialog-sm"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn
        color="primary"
        v-bind="props"
      >
        Open Dialog
      </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="Use Google's location service?">
      <VCardText>
        Bear claw pastry cotton candy jelly toffee. Pudding chocolate cake shortbread bonbon biscuit sweet. Lemon drops cupcake muffin brownie fruitcake. Pastry pastry tootsie roll jujubes chocolate cake gummi bears muffin pudding caramels. Jujubes lollipop gummies croissant shortbread. Cupcake dessert marzipan topping gingerbread apple pie chupa chups powder. Cake croissant halvah candy canes gummies. Candy tootsie roll sweet lemon drops tart cotton candy jujubes topping chupa chups. Biscuit icing pastry chocolate bar lollipop. Lemon drops oat cake chocolate cake dessert chocolate. Carrot cake ice cream bonbon tart tootsie roll cupcake dessert gingerbread. Apple pie dessert sweet candy bonbon. Sugar plum gummies powder brownie dessert candy canes candy canes candy.

        Sweet liquorice danish jujubes tart marshmallow cake. Danish chocolate bar icing dessert bonbon. Chocolate liquorice candy donut shortbread bonbon jujubes tart. Marshmallow cupcake marzipan icing pie dragée toffee. Cupcake soufflé pastry oat cake icing sesame snaps oat cake. Lollipop cheesecake cake tiramisu chocolate cake croissant. Donut candy canes sweet roll ice cream toffee gingerbread. Jelly-o biscuit oat cake cheesecake jujubes. Pudding chocolate biscuit gummies sesame snaps. Lemon drops candy canes chupa chups pudding muffin jujubes cupcake danish. Wafer chocolate oat cake sweet chocolate muffin. Pie dragée soufflé oat cake toffee dragée gummi bears. Jelly-o chocolate jelly fruitcake tart muffin icing sweet.

        Gummies pie lollipop carrot cake gingerbread sweet. Marshmallow tiramisu chocolate cake cake marshmallow. Pudding fruitcake shortbread biscuit powder cake. Dragée cookie cheesecake chupa chups toffee wafer. Wafer donut pudding chocolate shortbread cheesecake. Cupcake sweet roll lollipop chupa chups donut croissant carrot cake chocolate cake. Toffee soufflé biscuit gingerbread fruitcake. Jelly beans pudding jelly-o gingerbread apple pie ice cream. Muffin halvah cookie topping muffin sugar plum. Bonbon dessert cake tiramisu marzipan apple pie. Jelly beans caramels icing cake cake tiramisu dessert dessert jelly-o. Halvah ice cream cotton candy chupa chups cheesecake pudding cheesecake cupcake gummies. Croissant cookie candy canes cake chocolate.

        Pie cotton candy caramels sweet cake liquorice. Bear claw oat cake candy danish jelly-o fruitcake muffin sugar plum cupcake. Pudding cake cake lollipop chupa chups topping apple pie jelly oat cake. Pie candy canes tiramisu gummies icing cotton candy fruitcake marshmallow dragée. Pudding caramels muffin cookie cookie cupcake brownie ice cream. Liquorice lemon drops lemon drops cotton candy biscuit jelly-o jujubes topping. Lemon drops sweet dragée dessert sugar plum chocolate topping sugar plum oat cake. Muffin candy canes bonbon cotton candy liquorice gingerbread sesame snaps chocolate bar. Muffin gingerbread sesame snaps cake donut pie gingerbread soufflé croissant. Topping tart shortbread toffee jelly-o gingerbread cheesecake cupcake cake. Pudding powder icing marshmallow bear claw sesame snaps carrot cake. Jelly beans dessert tiramisu shortbread gummi bears gummies cotton candy. Tiramisu liquorice cookie pastry caramels icing tootsie roll.

        Pudding croissant tootsie roll jelly-o jelly beans gummi bears. Shortbread candy canes biscuit candy donut marshmallow candy canes. Fruitcake marshmallow chocolate bar sweet roll tart gummi bears brownie cupcake dragée. Cheesecake gummies sesame snaps soufflé jelly beans halvah bonbon tootsie roll. Sesame snaps marzipan cupcake candy cheesecake lollipop. Donut candy jelly-o liquorice topping gummi bears halvah. Pie sweet sweet jujubes bear claw marshmallow pudding lollipop tiramisu. Tiramisu tootsie roll topping chocolate cake tootsie roll cotton candy brownie. Jelly beans biscuit caramels cake toffee toffee lemon drops dessert. Toffee chupa chups tart bonbon brownie cake shortbread. Gummies marshmallow topping dragée chocolate bar. Chupa chups donut cheesecake cookie fruitcake muffin. Jelly-o cupcake cheesecake chocolate bar cupcake wafer. Liquorice muffin marzipan cotton candy cake lemon drops cake brownie.
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn
          color="secondary"
          variant="tonal"
          @click="isDialogVisible = false"
        >
          Disagree
        </VBtn>
        <VBtn @click="isDialogVisible = false">
          Agree
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
`},we={ts:`<script lang="ts" setup>
const isDialogVisible = ref(false)
<\/script>

<template>
  <VDialog
    v-model="isDialogVisible"
    persistent
    class="v-dialog-sm"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Open Dialog
      </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="Use Google's location service?">
      <VCardText>
        Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
      </VCardText>

      <VCardText class="d-flex justify-end gap-3 flex-wrap">
        <VBtn
          color="secondary"
          variant="tonal"
          @click="isDialogVisible = false"
        >
          Disagree
        </VBtn>
        <VBtn @click="isDialogVisible = false">
          Agree
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
`,js:`<script setup>
const isDialogVisible = ref(false)
<\/script>

<template>
  <VDialog
    v-model="isDialogVisible"
    persistent
    class="v-dialog-sm"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Open Dialog
      </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="Use Google's location service?">
      <VCardText>
        Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
      </VCardText>

      <VCardText class="d-flex justify-end gap-3 flex-wrap">
        <VBtn
          color="secondary"
          variant="tonal"
          @click="isDialogVisible = false"
        >
          Disagree
        </VBtn>
        <VBtn @click="isDialogVisible = false">
          Agree
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
`},Ce={ts:`<script lang="ts" setup>
const countryList = [
  { label: 'Bahamas, The', value: 'bahamas' },
  { label: 'Bahrain', value: 'bahrain' },
  { label: 'Bangladesh', value: 'bangladesh' },

  { label: 'Barbados', value: 'barbados' },
  { label: 'Belarus', value: 'belarus' },
  { label: 'Belgium', value: 'belgium' },
  { label: 'Belize', value: 'belize' },
  { label: 'Benin', value: 'benin' },
  { label: 'Bhutan', value: 'bhutan' },
  { label: 'Bolivia', value: 'bolivia' },
  { label: 'Bosnia and Herzegovina', value: 'bosnia' },

  { label: 'Botswana', value: 'botswana' },
  { label: 'Brazil', value: 'brazil' },
  { label: 'Brunei', value: 'brunei' },
  { label: 'Bulgaria', value: 'bulgaria' },
  { label: 'Burkina Faso', value: 'burkina' },
]

const selectedCountry = ref('')
const isDialogVisible = ref(false)
<\/script>

<template>
  <VDialog
    v-model="isDialogVisible"
    scrollable
    max-width="350"
    content-class="scrollable-dialog"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Open Dialog
      </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard>
      <VCardItem class="pb-5">
        <VCardTitle>Select Country</VCardTitle>
      </VCardItem>

      <VDivider />
      <VCardText style="block-size: 300px;">
        <VRadioGroup
          v-model="selectedCountry"
          :inline="false"
        >
          <VRadio
            v-for="country in countryList"
            :key="country.label"
            :label="country.label"
            :value="country.value"
            color="primary"
          />
        </VRadioGroup>
      </VCardText>

      <VDivider />

      <VCardText class="d-flex justify-end flex-wrap gap-3 pt-5">
        <VBtn
          color="secondary"
          variant="tonal"
          @click="isDialogVisible = false"
        >
          Close
        </VBtn>
        <VBtn @click="isDialogVisible = false">
          Save
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.scrollable-dialog{
  overflow: visible !important;
}
</style>
`,js:`<script setup>
const countryList = [
  {
    label: 'Bahamas, The',
    value: 'bahamas',
  },
  {
    label: 'Bahrain',
    value: 'bahrain',
  },
  {
    label: 'Bangladesh',
    value: 'bangladesh',
  },
  {
    label: 'Barbados',
    value: 'barbados',
  },
  {
    label: 'Belarus',
    value: 'belarus',
  },
  {
    label: 'Belgium',
    value: 'belgium',
  },
  {
    label: 'Belize',
    value: 'belize',
  },
  {
    label: 'Benin',
    value: 'benin',
  },
  {
    label: 'Bhutan',
    value: 'bhutan',
  },
  {
    label: 'Bolivia',
    value: 'bolivia',
  },
  {
    label: 'Bosnia and Herzegovina',
    value: 'bosnia',
  },
  {
    label: 'Botswana',
    value: 'botswana',
  },
  {
    label: 'Brazil',
    value: 'brazil',
  },
  {
    label: 'Brunei',
    value: 'brunei',
  },
  {
    label: 'Bulgaria',
    value: 'bulgaria',
  },
  {
    label: 'Burkina Faso',
    value: 'burkina',
  },
]

const selectedCountry = ref('')
const isDialogVisible = ref(false)
<\/script>

<template>
  <VDialog
    v-model="isDialogVisible"
    scrollable
    max-width="350"
    content-class="scrollable-dialog"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Open Dialog
      </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard>
      <VCardItem class="pb-5">
        <VCardTitle>Select Country</VCardTitle>
      </VCardItem>

      <VDivider />
      <VCardText style="block-size: 300px;">
        <VRadioGroup
          v-model="selectedCountry"
          :inline="false"
        >
          <VRadio
            v-for="country in countryList"
            :key="country.label"
            :label="country.label"
            :value="country.value"
            color="primary"
          />
        </VRadioGroup>
      </VCardText>

      <VDivider />

      <VCardText class="d-flex justify-end flex-wrap gap-3 pt-5">
        <VBtn
          color="secondary"
          variant="tonal"
          @click="isDialogVisible = false"
        >
          Close
        </VBtn>
        <VBtn @click="isDialogVisible = false">
          Save
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.scrollable-dialog{
  overflow: visible !important;
}
</style>
`},oa={__name:"dialog",setup(v){return(t,s)=>{const l=fe,o=se,i=be,m=ge,p=me,x=pe,z=ue,n=de,A=re;return y(),C(U,null,{default:a(()=>[e(f,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Basic",code:Ve},{default:a(()=>[s[0]||(s[0]=k("p",null,"A dialog contains two slots, one for its activator and one for its content (default). Good for Privacy Policies.",-1)),e(l)]),_:1},8,["code"])]),_:1}),e(f,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Persistent",code:we},{default:a(()=>[s[1]||(s[1]=k("p",null,[r("Use "),k("code",null,"persistent"),r(" prop to create persistent dialog.")],-1)),e(i)]),_:1},8,["code"])]),_:1}),e(f,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Scrollable",code:Ce},{default:a(()=>[s[2]||(s[2]=k("p",null,[r("Use "),k("code",null,"scrollable"),r(" prop to create scrollable dialog.")],-1)),e(m)]),_:1},8,["code"])]),_:1}),e(f,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Loader",code:ye},{default:a(()=>[s[3]||(s[3]=k("p",null,[r("The "),k("code",null,"v-dialog"),r(" component makes it easy to create a customized loading experience for your application.")],-1)),e(p)]),_:1},8,["code"])]),_:1}),e(f,{col:"12",md:"6"},{default:a(()=>[e(o,{title:"Nesting",code:De},{default:a(()=>[s[4]||(s[4]=k("p",null,"Dialogs can be nested: you can open one dialog from another.",-1)),e(x)]),_:1},8,["code"])]),_:1}),e(f,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Overflowed",code:he},{default:a(()=>[s[5]||(s[5]=k("p",null,"Modals that do not fit within the available window space will scroll the container.",-1)),e(z)]),_:1},8,["code"])]),_:1}),e(f,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Fullscreen",code:ke},{default:a(()=>[s[6]||(s[6]=k("p",null,"Due to limited space, full-screen dialogs may be more appropriate for mobile devices than dialogs used on devices with larger screens.",-1)),e(n)]),_:1},8,["code"])]),_:1}),e(f,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Form",code:ve},{default:a(()=>[s[7]||(s[7]=k("p",null,"Just a simple example of a form in a dialog.",-1)),e(A)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{oa as default};
