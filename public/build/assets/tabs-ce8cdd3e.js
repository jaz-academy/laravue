import{a as u,V}from"./VTabs-2aa4387b.js";import{r as C,o as c,c as b,d as i,b as e,e as a,a0 as q,v as n,n as d,aU as m,F as p,i as f,x as w,w as A,f as T,ai as h}from"./main-2161dd16.js";import{V as I}from"./VCardText-285783bc.js";import{V as W,a as v}from"./VWindowItem-1cb16d96.js";import{V as _}from"./VCard-79d2de72.js";import{_ as U}from"./_plugin-vue_export-helper-c27b6911.js";import{_ as O}from"./AppCardCode-1612e0cc.js";import{V as N}from"./VRow-cdbc520d.js";import{V as k}from"./VCol-b6fcabf3.js";import"./easing-9f15041e.js";import"./VSlideGroup-27a8dea1.js";import"./VAvatar-b27cc665.js";import"./VImg-4ff19814.js";import"./lazy-ac5cead8.js";import"./ssrBoot-ee409192.js";import"./VDivider-d54b4fba.js";const E={class:"d-flex gap-6"},M={__name:"DemoTabsVerticalPill",setup(g){const t=C("window-1");return(s,l)=>(c(),b("div",E,[i("div",null,[e(V,{modelValue:d(t),"onUpdate:modelValue":l[0]||(l[0]=o=>m(t)?t.value=o:null),direction:"vertical",class:"v-tabs-pill"},{default:a(()=>[e(u,null,{default:a(()=>[e(q,{start:"",icon:"tabler-user"}),l[2]||(l[2]=n(" Option 1 "))]),_:1}),e(u,null,{default:a(()=>[e(q,{start:"",icon:"tabler-lock"}),l[3]||(l[3]=n(" Option 2 "))]),_:1}),e(u,null,{default:a(()=>[e(q,{start:"",icon:"tabler-access-point"}),l[4]||(l[4]=n(" Option 3 "))]),_:1})]),_:1},8,["modelValue"])]),e(_,null,{default:a(()=>[e(I,null,{default:a(()=>[e(W,{modelValue:d(t),"onUpdate:modelValue":l[1]||(l[1]=o=>m(t)?t.value=o:null)},{default:a(()=>[e(v,{value:"window-1"},{default:a(()=>l[5]||(l[5]=[i("p",null," Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero. ",-1),i("p",{class:"mb-0"}," Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et. ",-1)])),_:1}),e(v,{value:"window-2"},{default:a(()=>l[6]||(l[6]=[i("p",{class:"mb-0"}," Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis. ",-1)])),_:1}),e(v,{value:"window-3"},{default:a(()=>l[7]||(l[7]=[i("p",{class:"mb-0"}," Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. ",-1)])),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]))}},G="Candy canes donut chupa chups candy canes lemon drops oat cake wafer. Cotton candy candy canes marzipan carrot cake. Sesame snaps lemon drops candy marzipan donut brownie tootsie roll. Icing croissant bonbon biscuit gummi bears. Pudding candy canes sugar plum cookie chocolate cake powder croissant.",H={__name:"DemoTabsBasicPill",setup(g){const t=C("window1");return(s,l)=>(c(),b(p,null,[e(V,{modelValue:d(t),"onUpdate:modelValue":l[0]||(l[0]=o=>m(t)?t.value=o:null),class:"v-tabs-pill"},{default:a(()=>[e(u,null,{default:a(()=>l[2]||(l[2]=[n("Tab One")])),_:1}),e(u,null,{default:a(()=>l[3]||(l[3]=[n("Tab Two")])),_:1}),e(u,null,{default:a(()=>l[4]||(l[4]=[n("Tab Three")])),_:1})]),_:1},8,["modelValue"]),e(_,{class:"mt-5"},{default:a(()=>[e(I,null,{default:a(()=>[e(W,{modelValue:d(t),"onUpdate:modelValue":l[1]||(l[1]=o=>m(t)?t.value=o:null)},{default:a(()=>[(c(),b(p,null,f(3,o=>e(v,{key:`window${o}`},{default:a(()=>[n(w(G))]),_:2},1024)),64))]),_:1},8,["modelValue"])]),_:1})]),_:1})],64))}},R={__name:"DemoTabsDynamic",setup(g){const t=C(3),s=C(0);return A(t,l=>{s.value=l-1}),(l,o)=>(c(),T(_,null,{default:a(()=>[e(V,{modelValue:d(s),"onUpdate:modelValue":o[0]||(o[0]=r=>m(s)?s.value=r:null)},{default:a(()=>[(c(!0),b(p,null,f(d(t),r=>(c(),T(u,{key:r,value:r},{default:a(()=>[n(" Tab "+w(r),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),e(I,{class:"text-center d-flex items-center gap-y-2 flex-wrap"},{default:a(()=>[e(h,{disabled:!d(t),class:"me-4",variant:d(t)?void 0:"tonal",onClick:o[1]||(o[1]=r=>t.value--)},{default:a(()=>o[3]||(o[3]=[n(" Remove Tab ")])),_:1},8,["disabled","variant"]),e(h,{onClick:o[2]||(o[2]=r=>t.value++)},{default:a(()=>o[4]||(o[4]=[n(" Add Tab ")])),_:1})]),_:1})]),_:1}))}},L={class:"d-flex justify-center gap-4 mt-3"},J="Chocolate cake marshmallow toffee sweet caramels tootsie roll chocolate bar. Chocolate candy lemon drops cupcake macaroon liquorice. Icing tiramisu cake pastry jujubes lollipop gummies sugar plum pie.",K={__name:"DemoTabsProgrammaticNavigation",setup(g){const t=C(0),s=["Appetizers","Entrees","Deserts","Cocktails"],l=s.length,o=()=>{t.value!==1&&(t.value-=1)},r=()=>{t.value!==l&&(t.value+=1)};return(P,y)=>(c(),T(_,null,{default:a(()=>[e(V,{modelValue:d(t),"onUpdate:modelValue":y[0]||(y[0]=x=>m(t)?t.value=x:null),grow:""},{default:a(()=>[(c(!0),b(p,null,f(s.length,x=>(c(),T(u,{key:x,value:x},{default:a(()=>[n(w(s[x-1]),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),e(I,null,{default:a(()=>[e(W,{modelValue:d(t),"onUpdate:modelValue":y[1]||(y[1]=x=>m(t)?t.value=x:null)},{default:a(()=>[(c(!0),b(p,null,f(s.length,x=>(c(),T(v,{key:x,value:x},{default:a(()=>[n(w(J))]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),i("div",L,[e(h,{disabled:d(t)===1,variant:d(t)===1?"tonal":void 0,onClick:o},{default:a(()=>y[2]||(y[2]=[n(" Previous ")])),_:1},8,["disabled","variant"]),e(h,{disabled:d(t)===d(l),variant:d(t)===d(l)?"tonal":void 0,onClick:r},{default:a(()=>y[3]||(y[3]=[n(" Next ")])),_:1},8,["disabled","variant"])])]),_:1})]),_:1}))}},Q="hortbread chocolate bar marshmallow bear claw tiramisu chocolate cookie wafer. Gummies sweet brownie brownie marshmallow chocolate cake pastry. Topping macaroon shortbread liquorice dragée macaroon.",X={__name:"DemoTabsGrow",setup(g){const t=C("Appetizers"),s=["Appetizers","Entrees","Deserts","Cocktails"];return(l,o)=>(c(),T(_,null,{default:a(()=>[e(V,{modelValue:d(t),"onUpdate:modelValue":o[0]||(o[0]=r=>m(t)?t.value=r:null),grow:""},{default:a(()=>[(c(),b(p,null,f(s,r=>e(u,{key:r},{default:a(()=>[n(w(r),1)]),_:2},1024)),64))]),_:1},8,["modelValue"]),e(I,null,{default:a(()=>[e(W,{modelValue:d(t),"onUpdate:modelValue":o[1]||(o[1]=r=>m(t)?t.value=r:null)},{default:a(()=>[(c(),b(p,null,f(s,r=>e(v,{key:r,value:r},{default:a(()=>[n(w(Q))]),_:2},1032,["value"])),64))]),_:1},8,["modelValue"])]),_:1})]),_:1}))}},Y="hortbread chocolate bar marshmallow bear claw tiramisu chocolate cookie wafer. Gummies sweet brownie brownie marshmallow chocolate cake pastry. Topping macaroon shortbread liquorice dragée macaroon.",Z={__name:"DemoTabsFixed",setup(g){const t=C("Appetizers"),s=["Fixed Tab 1","Fixed Tab 2","Fixed Tab 3","Fixed Tab 4"];return(l,o)=>(c(),T(_,null,{default:a(()=>[e(V,{modelValue:d(t),"onUpdate:modelValue":o[0]||(o[0]=r=>m(t)?t.value=r:null),"fixed-tabs":""},{default:a(()=>[(c(),b(p,null,f(s,r=>e(u,{key:r,value:r},{default:a(()=>[n(w(r),1)]),_:2},1032,["value"])),64))]),_:1},8,["modelValue"]),e(I,null,{default:a(()=>[e(W,{modelValue:d(t),"onUpdate:modelValue":o[1]||(o[1]=r=>m(t)?t.value=r:null)},{default:a(()=>[(c(),b(p,null,f(s,r=>e(v,{key:r,value:r},{default:a(()=>[n(w(Y))]),_:2},1032,["value"])),64))]),_:1},8,["modelValue"])]),_:1})]),_:1}))}},ee="hortbread chocolate bar marshmallow bear claw tiramisu chocolate cookie wafer.",ae={__name:"DemoTabsCustomIcons",setup(g){const t=C(0);return(s,l)=>(c(),T(_,null,{default:a(()=>[e(V,{"next-icon":"tabler-arrow-right","prev-icon":"tabler-arrow-left"},{default:a(()=>[(c(),b(p,null,f(10,o=>e(u,{key:o},{default:a(()=>[n(" Item "+w(o),1)]),_:2},1024)),64))]),_:1}),e(I,null,{default:a(()=>[e(W,{modelValue:d(t),"onUpdate:modelValue":l[0]||(l[0]=o=>m(t)?t.value=o:null)},{default:a(()=>[(c(),b(p,null,f(10,o=>e(v,{key:o,value:o},{default:a(()=>[n(w(ee))]),_:2},1032,["value"])),64))]),_:1},8,["modelValue"])]),_:1})]),_:1}))}},te="hortbread chocolate bar marshmallow bear claw tiramisu chocolate cookie wafer.",le={__name:"DemoTabsPagination",setup(g){const t=C("item1");return(s,l)=>(c(),T(_,null,{default:a(()=>[e(V,{modelValue:d(t),"onUpdate:modelValue":l[0]||(l[0]=o=>m(t)?t.value=o:null)},{default:a(()=>[(c(),b(p,null,f(10,o=>e(u,{key:o},{default:a(()=>[n(" Item "+w(o),1)]),_:2},1024)),64))]),_:1},8,["modelValue"]),e(I,null,{default:a(()=>[e(W,{modelValue:d(t),"onUpdate:modelValue":l[1]||(l[1]=o=>m(t)?t.value=o:null)},{default:a(()=>[(c(),b(p,null,f(10,o=>e(v,{key:o,value:`item${o}`},{default:a(()=>[n(w(te))]),_:2},1032,["value"])),64))]),_:1},8,["modelValue"])]),_:1})]),_:1}))}},oe={};function ne(g,t){return c(),T(_,null,{default:a(()=>[e(I,{class:"d-flex flex-column gap-4"},{default:a(()=>[i("div",null,[e(V,null,{default:a(()=>[e(u,null,{default:a(()=>t[0]||(t[0]=[n("Home")])),_:1}),e(u,null,{default:a(()=>t[1]||(t[1]=[n("Service")])),_:1}),e(u,null,{default:a(()=>t[2]||(t[2]=[n("Account")])),_:1})]),_:1})]),i("div",null,[e(V,{"align-tabs":"center"},{default:a(()=>[e(u,null,{default:a(()=>t[3]||(t[3]=[n("Home")])),_:1}),e(u,null,{default:a(()=>t[4]||(t[4]=[n("Service")])),_:1}),e(u,null,{default:a(()=>t[5]||(t[5]=[n("Account")])),_:1})]),_:1})]),i("div",null,[e(V,{"align-tabs":"end"},{default:a(()=>[e(u,null,{default:a(()=>t[6]||(t[6]=[n("Home")])),_:1}),e(u,null,{default:a(()=>t[7]||(t[7]=[n("Service")])),_:1}),e(u,null,{default:a(()=>t[8]||(t[8]=[n("Account")])),_:1})]),_:1})])]),_:1})]),_:1})}const se=U(oe,[["render",ne]]),ie={class:"d-flex"},re={__name:"DemoTabsVertical",setup(g){const t=C("tab-1");return(s,l)=>(c(),T(_,null,{default:a(()=>[i("div",ie,[i("div",null,[e(V,{modelValue:d(t),"onUpdate:modelValue":l[0]||(l[0]=o=>m(t)?t.value=o:null),direction:"vertical"},{default:a(()=>[e(u,null,{default:a(()=>[e(q,{start:"",icon:"tabler-user"}),l[2]||(l[2]=n(" Option 1 "))]),_:1}),e(u,null,{default:a(()=>[e(q,{start:"",icon:"tabler-lock"}),l[3]||(l[3]=n(" Option 2 "))]),_:1}),e(u,null,{default:a(()=>[e(q,{start:"",icon:"tabler-access-point"}),l[4]||(l[4]=n(" Option 3 "))]),_:1})]),_:1},8,["modelValue"])]),e(I,null,{default:a(()=>[e(W,{modelValue:d(t),"onUpdate:modelValue":l[1]||(l[1]=o=>m(t)?t.value=o:null),class:"ms-3"},{default:a(()=>[e(v,{value:"tab-1"},{default:a(()=>l[5]||(l[5]=[i("p",null," Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero. ",-1),i("p",{class:"mb-0"}," Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget. ",-1)])),_:1}),e(v,{value:"tab-2"},{default:a(()=>l[6]||(l[6]=[i("p",{class:"mb-0"}," Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero. ",-1)])),_:1}),e(v,{value:"tab-3"},{default:a(()=>l[7]||(l[7]=[i("p",{class:"mb-0"}," Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper. ",-1)])),_:1})]),_:1},8,["modelValue"])]),_:1})])]),_:1}))}},ue="Biscuit cheesecake gingerbread oat cake tiramisu. Marzipan tiramisu jelly-o muffin biscuit jelly cake pie. Chocolate cookie candy croissant brownie cupcake powder cheesecake. Biscuit sesame snaps biscuit topping tiramisu croissant.",ce={__name:"DemoTabsStacked",setup(g){const t=C("tab-1");return(s,l)=>(c(),T(_,null,{default:a(()=>[e(V,{modelValue:d(t),"onUpdate:modelValue":l[0]||(l[0]=o=>m(t)?t.value=o:null),grow:"",stacked:""},{default:a(()=>[e(u,null,{default:a(()=>[e(q,{icon:"tabler-phone",class:"mb-2"}),l[2]||(l[2]=i("span",null,"Recent",-1))]),_:1}),e(u,null,{default:a(()=>[e(q,{icon:"tabler-heart",class:"mb-2"}),l[3]||(l[3]=i("span",null,"Favorites",-1))]),_:1}),e(u,null,{default:a(()=>[e(q,{icon:"tabler-user",class:"mb-2"}),l[4]||(l[4]=i("span",null,"Nearby",-1))]),_:1})]),_:1},8,["modelValue"]),e(I,null,{default:a(()=>[e(W,{modelValue:d(t),"onUpdate:modelValue":l[1]||(l[1]=o=>m(t)?t.value=o:null)},{default:a(()=>[(c(),b(p,null,f(3,o=>e(v,{key:o,value:`tab-${o}`},{default:a(()=>[n(w(ue))]),_:2},1032,["value"])),64))]),_:1},8,["modelValue"])]),_:1})]),_:1}))}},de="Candy canes donut chupa chups candy canes lemon drops oat cake wafer. Cotton candy candy canes marzipan carrot cake. Sesame snaps lemon drops candy marzipan donut brownie tootsie roll. Icing croissant bonbon biscuit gummi bears. Pudding candy canes sugar plum cookie chocolate cake powder croissant.",me={__name:"DemoTabsBasic",setup(g){const t=C("item-1");return(s,l)=>(c(),T(_,null,{default:a(()=>[e(V,{modelValue:d(t),"onUpdate:modelValue":l[0]||(l[0]=o=>m(t)?t.value=o:null)},{default:a(()=>[e(u,null,{default:a(()=>l[2]||(l[2]=[n("Tab One")])),_:1}),e(u,null,{default:a(()=>l[3]||(l[3]=[n("Tab Two")])),_:1}),e(u,null,{default:a(()=>l[4]||(l[4]=[n("Tab Three")])),_:1})]),_:1},8,["modelValue"]),e(I,null,{default:a(()=>[e(W,{modelValue:d(t),"onUpdate:modelValue":l[1]||(l[1]=o=>m(t)?t.value=o:null)},{default:a(()=>[(c(),b(p,null,f(3,o=>e(v,{key:o,value:`item-${o}`},{default:a(()=>[n(w(de))]),_:2},1032,["value"])),64))]),_:1},8,["modelValue"])]),_:1})]),_:1}))}},be={ts:`<template>
  <VCard>
    <VCardText class="d-flex flex-column gap-4">
      <!-- Default -->
      <div>
        <VTabs>
          <VTab>Home</VTab>
          <VTab>Service</VTab>
          <VTab>Account</VTab>
        </VTabs>
      </div>

      <!-- Center -->
      <div>
        <VTabs align-tabs="center">
          <VTab>Home</VTab>
          <VTab>Service</VTab>
          <VTab>Account</VTab>
        </VTabs>
      </div>

      <!-- End -->
      <div>
        <VTabs align-tabs="end">
          <VTab>Home</VTab>
          <VTab>Service</VTab>
          <VTab>Account</VTab>
        </VTabs>
      </div>
    </VCardText>
  </VCard>
</template>
`,js:`<template>
  <VCard>
    <VCardText class="d-flex flex-column gap-4">
      <!-- Default -->
      <div>
        <VTabs>
          <VTab>Home</VTab>
          <VTab>Service</VTab>
          <VTab>Account</VTab>
        </VTabs>
      </div>

      <!-- Center -->
      <div>
        <VTabs align-tabs="center">
          <VTab>Home</VTab>
          <VTab>Service</VTab>
          <VTab>Account</VTab>
        </VTabs>
      </div>

      <!-- End -->
      <div>
        <VTabs align-tabs="end">
          <VTab>Home</VTab>
          <VTab>Service</VTab>
          <VTab>Account</VTab>
        </VTabs>
      </div>
    </VCardText>
  </VCard>
</template>
`},pe={ts:`<script lang="ts" setup>
const currentTab = ref('item-1')
const tabItemContent = 'Candy canes donut chupa chups candy canes lemon drops oat cake wafer. Cotton candy candy canes marzipan carrot cake. Sesame snaps lemon drops candy marzipan donut brownie tootsie roll. Icing croissant bonbon biscuit gummi bears. Pudding candy canes sugar plum cookie chocolate cake powder croissant.'
<\/script>

<template>
  <VCard>
    <VTabs v-model="currentTab">
      <VTab>Tab One</VTab>
      <VTab>Tab Two</VTab>
      <VTab>Tab Three</VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="item in 3"
          :key="item"
          :value="\`item-\${item}\`"
        >
          {{ tabItemContent }}
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
const currentTab = ref('item-1')
const tabItemContent = 'Candy canes donut chupa chups candy canes lemon drops oat cake wafer. Cotton candy candy canes marzipan carrot cake. Sesame snaps lemon drops candy marzipan donut brownie tootsie roll. Icing croissant bonbon biscuit gummi bears. Pudding candy canes sugar plum cookie chocolate cake powder croissant.'
<\/script>

<template>
  <VCard>
    <VTabs v-model="currentTab">
      <VTab>Tab One</VTab>
      <VTab>Tab Two</VTab>
      <VTab>Tab Three</VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="item in 3"
          :key="item"
          :value="\`item-\${item}\`"
        >
          {{ tabItemContent }}
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`},Ve={ts:`<script lang="ts" setup>
const currentTab = ref('window1')
const tabItemContent = 'Candy canes donut chupa chups candy canes lemon drops oat cake wafer. Cotton candy candy canes marzipan carrot cake. Sesame snaps lemon drops candy marzipan donut brownie tootsie roll. Icing croissant bonbon biscuit gummi bears. Pudding candy canes sugar plum cookie chocolate cake powder croissant.'
<\/script>

<template>
  <VTabs
    v-model="currentTab"
    class="v-tabs-pill"
  >
    <VTab>Tab One</VTab>
    <VTab>Tab Two</VTab>
    <VTab>Tab Three</VTab>
  </VTabs>

  <VCard class="mt-5">
    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="item in 3"
          :key="\`window\${item}\`"
        >
          {{ tabItemContent }}
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
const currentTab = ref('window1')
const tabItemContent = 'Candy canes donut chupa chups candy canes lemon drops oat cake wafer. Cotton candy candy canes marzipan carrot cake. Sesame snaps lemon drops candy marzipan donut brownie tootsie roll. Icing croissant bonbon biscuit gummi bears. Pudding candy canes sugar plum cookie chocolate cake powder croissant.'
<\/script>

<template>
  <VTabs
    v-model="currentTab"
    class="v-tabs-pill"
  >
    <VTab>Tab One</VTab>
    <VTab>Tab Two</VTab>
    <VTab>Tab Three</VTab>
  </VTabs>

  <VCard class="mt-5">
    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="item in 3"
          :key="\`window\${item}\`"
        >
          {{ tabItemContent }}
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`},Te={ts:`<script setup lang="ts">
const currentTab = ref(0)
const tabItemText = 'hortbread chocolate bar marshmallow bear claw tiramisu chocolate cookie wafer.'
<\/script>

<template>
  <VCard>
    <VTabs
      next-icon="tabler-arrow-right"
      prev-icon="tabler-arrow-left"
    >
      <VTab
        v-for="i in 10"
        :key="i"
      >
        Item {{ i }}
      </VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="i in 10"
          :key="i"
          :value="i"
        >
          {{ tabItemText }}
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
const currentTab = ref(0)
const tabItemText = 'hortbread chocolate bar marshmallow bear claw tiramisu chocolate cookie wafer.'
<\/script>

<template>
  <VCard>
    <VTabs
      next-icon="tabler-arrow-right"
      prev-icon="tabler-arrow-left"
    >
      <VTab
        v-for="i in 10"
        :key="i"
      >
        Item {{ i }}
      </VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="i in 10"
          :key="i"
          :value="i"
        >
          {{ tabItemText }}
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`},ve={ts:`<script lang="ts" setup>
const totalTabs = ref(3)
const currentTab = ref(0)

watch(totalTabs, newValue => {
  currentTab.value = newValue - 1
})
<\/script>

<template>
  <VCard>
    <VTabs v-model="currentTab">
      <VTab
        v-for="n in totalTabs"
        :key="n"
        :value="n"
      >
        Tab {{ n }}
      </VTab>
    </VTabs>

    <!-- buttons -->
    <VCardText class="text-center d-flex items-center gap-y-2 flex-wrap">
      <VBtn
        :disabled="!totalTabs"
        class="me-4"
        :variant="!totalTabs ? 'tonal' : undefined"
        @click="totalTabs--"
      >
        Remove Tab
      </VBtn>

      <VBtn @click="totalTabs++">
        Add Tab
      </VBtn>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
const totalTabs = ref(3)
const currentTab = ref(0)

watch(totalTabs, newValue => {
  currentTab.value = newValue - 1
})
<\/script>

<template>
  <VCard>
    <VTabs v-model="currentTab">
      <VTab
        v-for="n in totalTabs"
        :key="n"
        :value="n"
      >
        Tab {{ n }}
      </VTab>
    </VTabs>

    <!-- buttons -->
    <VCardText class="text-center d-flex items-center gap-y-2 flex-wrap">
      <VBtn
        :disabled="!totalTabs"
        class="me-4"
        :variant="!totalTabs ? 'tonal' : undefined"
        @click="totalTabs--"
      >
        Remove Tab
      </VBtn>

      <VBtn @click="totalTabs++">
        Add Tab
      </VBtn>
    </VCardText>
  </VCard>
</template>
`},fe={ts:`<script lang="ts" setup>
const currentTab = ref('Appetizers')
const items = ['Fixed Tab 1', 'Fixed Tab 2', 'Fixed Tab 3', 'Fixed Tab 4']
const tabItemText = 'hortbread chocolate bar marshmallow bear claw tiramisu chocolate cookie wafer. Gummies sweet brownie brownie marshmallow chocolate cake pastry. Topping macaroon shortbread liquorice dragée macaroon.'
<\/script>

<template>
  <VCard>
    <VTabs
      v-model="currentTab"
      fixed-tabs
    >
      <VTab
        v-for="item in items"
        :key="item"
        :value="item"
      >
        {{ item }}
      </VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="item in items"
          :key="item"
          :value="item"
        >
          {{ tabItemText }}
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
const currentTab = ref('Appetizers')

const items = [
  'Fixed Tab 1',
  'Fixed Tab 2',
  'Fixed Tab 3',
  'Fixed Tab 4',
]

const tabItemText = 'hortbread chocolate bar marshmallow bear claw tiramisu chocolate cookie wafer. Gummies sweet brownie brownie marshmallow chocolate cake pastry. Topping macaroon shortbread liquorice dragée macaroon.'
<\/script>

<template>
  <VCard>
    <VTabs
      v-model="currentTab"
      fixed-tabs
    >
      <VTab
        v-for="item in items"
        :key="item"
        :value="item"
      >
        {{ item }}
      </VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="item in items"
          :key="item"
          :value="item"
        >
          {{ tabItemText }}
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`},we={ts:`<script lang="ts" setup>
const currentTab = ref('Appetizers')
const items = ['Appetizers', 'Entrees', 'Deserts', 'Cocktails']
const tabItemText = 'hortbread chocolate bar marshmallow bear claw tiramisu chocolate cookie wafer. Gummies sweet brownie brownie marshmallow chocolate cake pastry. Topping macaroon shortbread liquorice dragée macaroon.'
<\/script>

<template>
  <VCard>
    <VTabs
      v-model="currentTab"
      grow
    >
      <VTab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="item in items"
          :key="item"
          :value="item"
        >
          {{ tabItemText }}
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
const currentTab = ref('Appetizers')

const items = [
  'Appetizers',
  'Entrees',
  'Deserts',
  'Cocktails',
]

const tabItemText = 'hortbread chocolate bar marshmallow bear claw tiramisu chocolate cookie wafer. Gummies sweet brownie brownie marshmallow chocolate cake pastry. Topping macaroon shortbread liquorice dragée macaroon.'
<\/script>

<template>
  <VCard>
    <VTabs
      v-model="currentTab"
      grow
    >
      <VTab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="item in items"
          :key="item"
          :value="item"
        >
          {{ tabItemText }}
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`},ge={ts:`<script setup lang="ts">
const currentTab = ref('item1')
const tabItemText = 'hortbread chocolate bar marshmallow bear claw tiramisu chocolate cookie wafer.'
<\/script>

<template>
  <VCard>
    <VTabs v-model="currentTab">
      <VTab
        v-for="i in 10"
        :key="i"
      >
        Item {{ i }}
      </VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="i in 10"
          :key="i"
          :value="\`item\${i}\`"
        >
          {{ tabItemText }}
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
const currentTab = ref('item1')
const tabItemText = 'hortbread chocolate bar marshmallow bear claw tiramisu chocolate cookie wafer.'
<\/script>

<template>
  <VCard>
    <VTabs v-model="currentTab">
      <VTab
        v-for="i in 10"
        :key="i"
      >
        Item {{ i }}
      </VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="i in 10"
          :key="i"
          :value="\`item\${i}\`"
        >
          {{ tabItemText }}
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`},xe={ts:`<script lang="ts" setup>
const currentTab = ref(0)
const items = ['Appetizers', 'Entrees', 'Deserts', 'Cocktails']
const tabItemText = 'Chocolate cake marshmallow toffee sweet caramels tootsie roll chocolate bar. Chocolate candy lemon drops cupcake macaroon liquorice. Icing tiramisu cake pastry jujubes lollipop gummies sugar plum pie.'
const totalTabs = items.length

const preTab = () => {
  if (currentTab.value !== 1)
    currentTab.value -= 1
}

const nextTab = () => {
  if (currentTab.value !== totalTabs)
    currentTab.value += 1
}
<\/script>

<template>
  <VCard>
    <VTabs
      v-model="currentTab"
      grow
    >
      <VTab
        v-for="item in items.length"
        :key="item"
        :value="item"
      >
        {{ items[item - 1] }}
      </VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="item in items.length"
          :key="item"
          :value="item"
        >
          {{ tabItemText }}
        </VWindowItem>
      </VWindow>

      <div class="d-flex justify-center gap-4 mt-3">
        <VBtn
          :disabled="currentTab === 1"
          :variant="currentTab === 1 ? 'tonal' : undefined"
          @click="preTab"
        >
          Previous
        </VBtn>

        <VBtn
          :disabled="currentTab === totalTabs"
          :variant="currentTab === totalTabs ? 'tonal' : undefined"
          @click="nextTab"
        >
          Next
        </VBtn>
      </div>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
const currentTab = ref(0)

const items = [
  'Appetizers',
  'Entrees',
  'Deserts',
  'Cocktails',
]

const tabItemText = 'Chocolate cake marshmallow toffee sweet caramels tootsie roll chocolate bar. Chocolate candy lemon drops cupcake macaroon liquorice. Icing tiramisu cake pastry jujubes lollipop gummies sugar plum pie.'
const totalTabs = items.length

const preTab = () => {
  if (currentTab.value !== 1)
    currentTab.value -= 1
}

const nextTab = () => {
  if (currentTab.value !== totalTabs)
    currentTab.value += 1
}
<\/script>

<template>
  <VCard>
    <VTabs
      v-model="currentTab"
      grow
    >
      <VTab
        v-for="item in items.length"
        :key="item"
        :value="item"
      >
        {{ items[item - 1] }}
      </VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="item in items.length"
          :key="item"
          :value="item"
        >
          {{ tabItemText }}
        </VWindowItem>
      </VWindow>

      <div class="d-flex justify-center gap-4 mt-3">
        <VBtn
          :disabled="currentTab === 1"
          :variant="currentTab === 1 ? 'tonal' : undefined"
          @click="preTab"
        >
          Previous
        </VBtn>

        <VBtn
          :disabled="currentTab === totalTabs"
          :variant="currentTab === totalTabs ? 'tonal' : undefined"
          @click="nextTab"
        >
          Next
        </VBtn>
      </div>
    </VCardText>
  </VCard>
</template>
`},ke={ts:`<script lang="ts" setup>
const currentTab = ref('tab-1')
const tabItemText = 'Biscuit cheesecake gingerbread oat cake tiramisu. Marzipan tiramisu jelly-o muffin biscuit jelly cake pie. Chocolate cookie candy croissant brownie cupcake powder cheesecake. Biscuit sesame snaps biscuit topping tiramisu croissant.'
<\/script>

<template>
  <VCard>
    <VTabs
      v-model="currentTab"
      grow
      stacked
    >
      <VTab>
        <VIcon
          icon="tabler-phone"
          class="mb-2"
        />
        <span>Recent</span>
      </VTab>

      <VTab>
        <VIcon
          icon="tabler-heart"
          class="mb-2"
        />
        <span>Favorites</span>
      </VTab>

      <VTab>
        <VIcon
          icon="tabler-user"
          class="mb-2"
        />
        <span>Nearby</span>
      </VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="i in 3"
          :key="i"
          :value="\`tab-\${i}\`"
        >
          {{ tabItemText }}
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
const currentTab = ref('tab-1')
const tabItemText = 'Biscuit cheesecake gingerbread oat cake tiramisu. Marzipan tiramisu jelly-o muffin biscuit jelly cake pie. Chocolate cookie candy croissant brownie cupcake powder cheesecake. Biscuit sesame snaps biscuit topping tiramisu croissant.'
<\/script>

<template>
  <VCard>
    <VTabs
      v-model="currentTab"
      grow
      stacked
    >
      <VTab>
        <VIcon
          icon="tabler-phone"
          class="mb-2"
        />
        <span>Recent</span>
      </VTab>

      <VTab>
        <VIcon
          icon="tabler-heart"
          class="mb-2"
        />
        <span>Favorites</span>
      </VTab>

      <VTab>
        <VIcon
          icon="tabler-user"
          class="mb-2"
        />
        <span>Nearby</span>
      </VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="i in 3"
          :key="i"
          :value="\`tab-\${i}\`"
        >
          {{ tabItemText }}
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`},Ce={ts:`<script setup lang="ts">
const currentTab = ref('tab-1')
<\/script>

<template>
  <VCard>
    <div class="d-flex">
      <div>
        <VTabs
          v-model="currentTab"
          direction="vertical"
        >
          <VTab>
            <VIcon
              start
              icon="tabler-user"
            />
            Option 1
          </VTab>

          <VTab>
            <VIcon
              start
              icon="tabler-lock"
            />
            Option 2
          </VTab>

          <VTab>
            <VIcon
              start
              icon="tabler-access-point"
            />
            Option 3
          </VTab>
        </VTabs>
      </div>

      <VCardText>
        <VWindow
          v-model="currentTab"
          class="ms-3"
        >
          <VWindowItem value="tab-1">
            <p>
              Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
            </p>

            <p class="mb-0">
              Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget.
            </p>
          </VWindowItem>

          <VWindowItem value="tab-2">
            <p class="mb-0">
              Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero.
            </p>
          </VWindowItem>

          <VWindowItem value="tab-3">
            <p class="mb-0">
              Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper.
            </p>
          </VWindowItem>
        </VWindow>
      </VCardText>
    </div>
  </VCard>
</template>
`,js:`<script setup>
const currentTab = ref('tab-1')
<\/script>

<template>
  <VCard>
    <div class="d-flex">
      <div>
        <VTabs
          v-model="currentTab"
          direction="vertical"
        >
          <VTab>
            <VIcon
              start
              icon="tabler-user"
            />
            Option 1
          </VTab>

          <VTab>
            <VIcon
              start
              icon="tabler-lock"
            />
            Option 2
          </VTab>

          <VTab>
            <VIcon
              start
              icon="tabler-access-point"
            />
            Option 3
          </VTab>
        </VTabs>
      </div>

      <VCardText>
        <VWindow
          v-model="currentTab"
          class="ms-3"
        >
          <VWindowItem value="tab-1">
            <p>
              Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
            </p>

            <p class="mb-0">
              Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget.
            </p>
          </VWindowItem>

          <VWindowItem value="tab-2">
            <p class="mb-0">
              Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero.
            </p>
          </VWindowItem>

          <VWindowItem value="tab-3">
            <p class="mb-0">
              Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper.
            </p>
          </VWindowItem>
        </VWindow>
      </VCardText>
    </div>
  </VCard>
</template>
`},Ie={ts:`<script setup lang="ts">
const currentTab = ref('window-1')
<\/script>

<template>
  <div class="d-flex gap-6">
    <div>
      <VTabs
        v-model="currentTab"
        direction="vertical"
        class="v-tabs-pill"
      >
        <VTab>
          <VIcon
            start
            icon="tabler-user"
          />
          Option 1
        </VTab>

        <VTab>
          <VIcon
            start
            icon="tabler-lock"
          />
          Option 2
        </VTab>

        <VTab>
          <VIcon
            start
            icon="tabler-access-point"
          />
          Option 3
        </VTab>
      </VTabs>
    </div>

    <VCard>
      <VCardText>
        <VWindow v-model="currentTab">
          <VWindowItem value="window-1">
            <p>
              Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
            </p>

            <p class="mb-0">
              Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et.
            </p>
          </VWindowItem>

          <VWindowItem value="window-2">
            <p class="mb-0">
              Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
            </p>
          </VWindowItem>

          <VWindowItem value="window-3">
            <p class="mb-0">
              Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
            </p>
          </VWindowItem>
        </VWindow>
      </VCardText>
    </VCard>
  </div>
</template>
`,js:`<script setup>
const currentTab = ref('window-1')
<\/script>

<template>
  <div class="d-flex gap-6">
    <div>
      <VTabs
        v-model="currentTab"
        direction="vertical"
        class="v-tabs-pill"
      >
        <VTab>
          <VIcon
            start
            icon="tabler-user"
          />
          Option 1
        </VTab>

        <VTab>
          <VIcon
            start
            icon="tabler-lock"
          />
          Option 2
        </VTab>

        <VTab>
          <VIcon
            start
            icon="tabler-access-point"
          />
          Option 3
        </VTab>
      </VTabs>
    </div>

    <VCard>
      <VCardText>
        <VWindow v-model="currentTab">
          <VWindowItem value="window-1">
            <p>
              Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
            </p>

            <p class="mb-0">
              Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et.
            </p>
          </VWindowItem>

          <VWindowItem value="window-2">
            <p class="mb-0">
              Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
            </p>
          </VWindowItem>

          <VWindowItem value="window-3">
            <p class="mb-0">
              Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
            </p>
          </VWindowItem>
        </VWindow>
      </VCardText>
    </VCard>
  </div>
</template>
`},Ne={__name:"tabs",setup(g){return(t,s)=>{const l=me,o=O,r=ce,P=re,y=se,x=le,S=ae,D=Z,F=X,j=K,$=R,B=H,z=M;return c(),T(N,{class:"match-height"},{default:a(()=>[e(k,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Basic",variant:"outlined",code:pe},{default:a(()=>[s[0]||(s[0]=i("p",null,[n("The "),i("code",null,"v-tabs"),n(" component is used for hiding content behind a selectable item.")],-1)),e(l)]),_:1},8,["code"])]),_:1}),e(k,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Stacked",variant:"outlined",code:ke},{default:a(()=>[s[1]||(s[1]=i("p",null,[n("Using "),i("code",null,"stacked"),n(" prop you can have buttons that use both icons and text.")],-1)),e(r)]),_:1},8,["code"])]),_:1}),e(k,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Vertical",variant:"outlined",code:Ce},{default:a(()=>[s[2]||(s[2]=i("p",null,[n("The "),i("code",null,"vertical"),n(" prop allows for "),i("code",null,"v-tab"),n(" components to stack vertically.")],-1)),e(P)]),_:1},8,["code"])]),_:1}),e(k,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Alignment",variant:"outlined",code:be},{default:a(()=>[s[3]||(s[3]=i("p",null,[n("Use "),i("code",null,"align-tabs"),n(" prop to change the tabs alignment.")],-1)),e(y)]),_:1},8,["code"])]),_:1}),e(k,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Pagination",variant:"outlined",code:ge},{default:a(()=>[s[4]||(s[4]=i("p",null,"If the tab items overflow their container, pagination controls will appear on desktop.",-1)),e(x)]),_:1},8,["code"])]),_:1}),e(k,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Custom Icons",variant:"outlined",code:Te},{default:a(()=>[s[5]||(s[5]=i("p",null,[i("code",null,"prev-icon"),n(" and "),i("code",null,"next-icon"),n(" props can be used for applying custom pagination icons.")],-1)),e(S)]),_:1},8,["code"])]),_:1}),e(k,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Fixed",variant:"outlined",code:fe},{default:a(()=>[s[6]||(s[6]=i("p",null,[n("The "),i("code",null,"fixed-tabs"),n(" prop forces "),i("code",null,"v-tab"),n(" to take up all available space up to the maximum width (300px).")],-1)),e(D)]),_:1},8,["code"])]),_:1}),e(k,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Grow",variant:"outlined",code:we},{default:a(()=>[s[7]||(s[7]=i("p",null,[n("The "),i("code",null,"grow"),n(" prop will make the tab items take up all available space with no limit.")],-1)),e(F)]),_:1},8,["code"])]),_:1}),e(k,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Programmatic Navigation",variant:"outlined",code:xe},{default:a(()=>[e(j)]),_:1},8,["code"])]),_:1}),e(k,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Dynamic",variant:"outlined",code:ve},{default:a(()=>[s[8]||(s[8]=i("p",null,[n("Tabs can be dynamically added and removed. This allows you to update to any number and the "),i("code",null,"v-tabs"),n(" component will react.")],-1)),e($)]),_:1},8,["code"])]),_:1}),e(k,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Basic Pill",variant:"outlined",code:Ve},{default:a(()=>[s[9]||(s[9]=i("p",null,[n("Use our custom class "),i("code",null,".v-tabs-pill"),n(" along with "),i("code",null,"v-tabs"),n(" component to style pill tabs.")],-1)),e(B)]),_:1},8,["code"])]),_:1}),e(k,{cols:"12",md:"6"},{default:a(()=>[e(o,{title:"Vertical Pill",variant:"outlined",code:Ie},{default:a(()=>[s[10]||(s[10]=i("p",null,"Use our custom class .v-tabs-pill along with v-tabs component to style pill tabs.",-1)),e(z)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{Ne as default};
