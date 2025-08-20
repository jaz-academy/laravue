import{a as m,b as h,V as g,c as A,d as T,e as S}from"./VList-deb9c324.js";import{o as n,f as d,e,c as f,F as V,i as L,b as t,a1 as x,x as y,v as i,a_ as $,z as J,aj as D,d as u,d7 as P,da as z,db as U,dc as G,r as W,s as k,n as K,aV as Q,_ as E}from"./main-e40851b7.js";import{V as w}from"./VAvatar-43d2e5c8.js";import{V as j}from"./VDivider-06554ebe.js";import{V as Y}from"./VBadge-94fc060d.js";import{V as C}from"./VListItemAction-c834f17c.js";import{V as B}from"./VCheckbox-49b0f7b1.js";import{_ as q}from"./AppCardCode-9984f253.js";import{V as X,a as b}from"./VRow-f8693abc.js";import{V as o}from"./VCardText-e11304cd.js";import"./ssrBoot-282be025.js";import"./VImg-d0687b57.js";import"./VCheckboxBtn-d41b44e1.js";import"./VSelectionControl-6e4301a8.js";import"./form-c3e0076b.js";import"./VInput-6eaa5e55.js";import"./VCard-c8ea4733.js";const Z={__name:"DemoListShaped",setup(v){const a=[{text:"Cupcake sesame snaps dessert marzipan.",icon:"tabler-brand-instagram"},{text:"Jelly beans jelly-o gummi bears chupa chups marshmallow.",icon:"tabler-brand-facebook"},{text:"Bonbon macaroon gummies pie jelly",icon:"tabler-brand-twitter"}];return(s,c)=>(n(),d(g,null,{default:e(()=>[(n(),f(V,null,L(a,(l,r)=>t(m,{key:r,value:l.text,rounded:"shaped"},{prepend:e(()=>[t(x,{icon:l.icon},null,8,["icon"])]),default:e(()=>[t(h,{textContent:y(l.text)},null,8,["textContent"])]),_:2},1032,["value"])),64))]),_:1}))}},tt={__name:"DemoListProgressList",setup(v){const a=[{avatar:"tabler-brand-react",title:"React is a JavaScript library for building user interfaces",language:"react",amount:90},{avatar:"tabler-brand-bootstrap",title:"Bootstrap is an open source toolkit",language:"bootstrap",amount:80},{avatar:"tabler-brand-vue",title:"Vue.js is the Progressive JavaScript Framework",language:"vue",amount:65},{avatar:"tabler-brand-angular",title:"Angular implements Functional Programming concepts",language:"angular",amount:75},{avatar:"tabler-brand-javascript",title:"JavaScript is the programming language of the Web",language:"javascript",amount:70}],s={react:"info",bootstrap:"primary",vue:"success",angular:"error",javascript:"warning"};return(c,l)=>(n(),d(g,{lines:"two",border:""},{default:e(()=>[(n(),f(V,null,L(a,(r,p)=>(n(),f(V,{key:r.language},[t(m,null,{prepend:e(()=>[t(w,{size:"36",rounded:"",variant:"tonal",icon:r.avatar,color:s[r.language]},null,8,["icon","color"])]),default:e(()=>[t(h,null,{default:e(()=>[i(y(r.title),1)]),_:2},1024),t(A,{class:"mt-2"},{default:e(()=>[t($,{height:"6",rounded:"","model-value":r.amount,"bg-color":"secondary",color:s[r.language]},null,8,["model-value","color"])]),_:2},1024)]),_:2},1024),p!==a.length-1?(n(),d(j,{key:0})):J("",!0)],64))),64))]),_:1}))}},et={class:"ms-4"},at={class:"text-xs text-disabled"},st={__name:"DemoListUserList",setup(v){const a=[{avatar:P,name:"Caroline Black",status:"Online",lastVisited:"13 minutes ago"},{avatar:z,name:"Alfred Copeland",status:"Away",lastVisited:"11 minutes ago"},{avatar:U,name:"Celia Schneider",status:"Offline",lastVisited:"9 minutes ago"},{avatar:G,name:"Max Rogan",status:"In Meeting",lastVisited:"28 minutes ago"}],s={Online:"success",Away:"warning",Offline:"secondary","In Meeting":"error"};return(c,l)=>(n(),d(g,{lines:"two",border:""},{default:e(()=>[(n(),f(V,null,L(a,(r,p)=>(n(),f(V,{key:r.name},[t(m,null,{prepend:e(()=>[t(w,{image:r.avatar},null,8,["image"])]),append:e(()=>[t(D,{size:"small"},{default:e(()=>l[0]||(l[0]=[i(" Add ")])),_:1})]),default:e(()=>[t(h,null,{default:e(()=>[i(y(r.name),1)]),_:2},1024),t(A,{class:"mt-1"},{default:e(()=>[t(Y,{dot:"",location:"start center","offset-x":"2",color:s[r.status],class:"me-3"},{default:e(()=>[u("span",et,y(r.status),1)]),_:2},1032,["color"]),u("span",at,y(r.lastVisited),1)]),_:2},1024)]),_:2},1024),p!==a.length-1?(n(),d(j,{key:0})):J("",!0)],64))),64))]),_:1}))}},it=["innerHTML"],lt={__name:"DemoListThreeLine",setup(v){const a=[{type:"subheader",title:"Today"},{prependAvatar:P,title:"Brunch this weekend?",subtitle:`<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`},{type:"divider",inset:!0},{prependAvatar:z,title:"Summer BBQ",subtitle:`<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`},{type:"divider",inset:!0},{prependAvatar:U,title:"Oui oui",subtitle:'<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?'},{type:"divider",inset:!0},{prependAvatar:G,title:"Birthday gift",subtitle:'<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?'}];return(s,c)=>(n(),d(g,{lines:"three",items:a,"item-props":""},{subtitle:e(({subtitle:l})=>[u("div",{innerHTML:l},null,8,it)]),_:1}))}},rt={__name:"DemoListTwoLinesAndSubheader",setup(v){const a=[{color:"blue",icon:"tabler-clipboard-text",subtitle:"Jan 20, 2014",title:"Vacation itinerary"},{color:"amber",icon:"tabler-device-mobile-rotated",subtitle:"Jan 10, 2014",title:"Kitchen remodel"}],s=[{subtitle:"Jan 9, 2014",title:"Photos"},{subtitle:"Jan 17, 2014",title:"Recipes"},{subtitle:"Jan 28, 2014",title:"Work"}];return(c,l)=>(n(),d(g,{lines:"two"},{default:e(()=>[t(T,{inset:""},{default:e(()=>l[0]||(l[0]=[i(" Folders ")])),_:1}),(n(),f(V,null,L(s,r=>t(m,{key:r.title,title:r.title,subtitle:r.subtitle},{prepend:e(()=>[t(w,{color:"secondary",variant:"tonal"},{default:e(()=>[t(x,{size:26,icon:"tabler-folder"})]),_:1})]),append:e(()=>[t(D,{variant:"text",color:"default",size:"small",icon:"tabler-info-circle"})]),_:2},1032,["title","subtitle"])),64)),t(j,{inset:""}),t(T,{inset:""},{default:e(()=>l[1]||(l[1]=[i(" Files ")])),_:1}),(n(),f(V,null,L(a,r=>t(m,{key:r.title,title:r.title,subtitle:r.subtitle},{prepend:e(()=>[t(w,{color:"secondary",variant:"tonal"},{default:e(()=>[t(x,{size:26,icon:r.icon},null,8,["icon"])]),_:2},1024)]),append:e(()=>[t(D,{variant:"text",color:"default",size:"small",icon:"tabler-info-circle"})]),_:2},1032,["title","subtitle"])),64))]),_:1}))}},nt={__name:"DemoListSubGroup",setup(v){const a=W(["Users","Admin"]),s=[["Management","tabler-users"],["Settings","tabler-settings"]],c=[["Create","tabler-plus"],["Read","tabler-file"],["Update","tabler-reload"],["Delete","tabler-trash"]];return(l,r)=>(n(),d(g,{opened:K(a),"onUpdate:opened":r[0]||(r[0]=p=>Q(a)?a.value=p:null)},{default:e(()=>[t(m,{"prepend-icon":"tabler-home",title:"Home",value:"Home"}),t(S,{value:"Users"},{activator:e(({props:p})=>[t(m,k(p,{"prepend-icon":"tabler-users",title:"Users"}),null,16)]),default:e(()=>[t(S,{value:"Admin"},{activator:e(({props:p})=>[t(m,k(p,{title:"Admin"}),null,16)]),default:e(()=>[(n(),f(V,null,L(s,([p,_],I)=>t(m,{key:I,value:p,title:p,"prepend-icon":_},null,8,["value","title","prepend-icon"])),64))]),_:1}),t(S,{value:"Actions"},{activator:e(({props:p})=>[t(m,k(p,{title:"Actions"}),null,16)]),default:e(()=>[(n(),f(V,null,L(c,([p,_],I)=>t(m,{key:I,value:p,title:p,"prepend-icon":_},null,8,["value","title","prepend-icon"])),64))]),_:1})]),_:1})]),_:1},8,["opened"]))}},ot={};function pt(v,a){return n(),d(g,{lines:"three",density:"compact","select-strategy":"classic",class:"action-item-group-list"},{default:e(()=>[t(T,null,{default:e(()=>a[0]||(a[0]=[i("General")])),_:1}),t(m,{value:"notifications"},{prepend:e(({isActive:s})=>[t(C,{start:""},{default:e(()=>[t(B,{"model-value":s,color:"primary",class:"mt-2"},null,8,["model-value"])]),_:2},1024)]),default:e(()=>[t(h,null,{default:e(()=>a[1]||(a[1]=[i("Notifications")])),_:1}),t(A,null,{default:e(()=>a[2]||(a[2]=[i("Notify me about updates to apps or games that I downloaded")])),_:1})]),_:1}),t(m,{value:"sound"},{prepend:e(({isActive:s})=>[t(C,{start:""},{default:e(()=>[t(B,{"model-value":s,color:"primary",class:"mt-2"},null,8,["model-value"])]),_:2},1024)]),default:e(()=>[t(h,null,{default:e(()=>a[3]||(a[3]=[i("Sound")])),_:1}),t(A,null,{default:e(()=>a[4]||(a[4]=[i("Auto-update apps at any time. Data charges may apply")])),_:1})]),_:1}),t(m,{value:"widgets"},{prepend:e(({isActive:s})=>[t(C,{start:""},{default:e(()=>[t(B,{"model-value":s,color:"primary",class:"mt-2"},null,8,["model-value"])]),_:2},1024)]),default:e(()=>[t(h,null,{default:e(()=>a[5]||(a[5]=[i("Auto-add widgets")])),_:1}),t(A,null,{default:e(()=>a[6]||(a[6]=[i("Automatically add home screen widgets when downloads complete")])),_:1})]),_:1})]),_:1})}const ut=E(ot,[["render",pt]]),mt={__name:"DemoListNav",setup(v){const a=[{title:"My Files",value:1,prependIcon:"tabler-folder"},{title:"Shared with me",value:2,prependIcon:"tabler-users"},{title:"Starred",value:3,prependIcon:"tabler-star"},{title:"Recent",value:4,prependIcon:"tabler-history"},{title:"Offline",value:5,prependIcon:"tabler-circle-check"},{title:"Uploads",value:6,prependIcon:"tabler-upload"},{title:"Backups",value:7,prependIcon:"tabler-cloud-upload"}];return(s,c)=>(n(),d(g,{nav:"",lines:!1},{default:e(()=>[(n(),f(V,null,L(a,l=>t(m,{key:l.value,value:l.value},{prepend:e(()=>[t(x,{icon:l.prependIcon},null,8,["icon"])]),default:e(()=>[t(h,null,{default:e(()=>[i(y(l.title),1)]),_:2},1024)]),_:2},1032,["value"])),64))]),_:1}))}},dt={__name:"DemoListDensity",setup(v){const a=[{title:"halvah icing marshmallow",value:1},{title:"Cake caramels donut danish muffin biscuit",value:2},{title:"Chocolate cake pie lollipop",value:3},{title:"Apple pie toffee pudding gummi bears",value:4},{title:"Jujubes chupa chups cheesecake tart",value:5},{title:"Candy fruitcake bonbon sesame snaps dessert",value:6},{title:"Candy wafer tiramisu sugar plum sweet.",value:7},{title:"Toffee gingerbread muffin macaroon cotton candy bonbon lollipop.",value:8}];return(s,c)=>(n(),d(g,{density:"compact",items:a}))}},ct={__name:"DemoListRounded",setup(v){const a=[{title:"Cupcake sesame snaps dessert marzipan.",value:1,props:{prependIcon:"tabler-brand-instagram",rounded:"xl"}},{title:"Jelly beans jelly-o gummi bears chupa chups marshmallow.",value:2,props:{prependIcon:"tabler-brand-facebook",rounded:"xl"}},{title:"Bonbon macaroon gummies pie jelly",value:3,props:{prependIcon:"tabler-brand-twitter",rounded:"xl"}},{title:"halvah icing marshmallow",value:4,props:{prependIcon:"tabler-brand-instagram",rounded:"xl"}}];return(s,c)=>(n(),d(g,{items:a}))}},vt={__name:"DemoListBasic",setup(v){const a=["Cras justo odio","Dapibus ac facilisis in","Morbi leo risus","Porta ac consectetur ac"];return(s,c)=>(n(),d(g,{items:a}))}},bt={ts:`<template>
  <VList
    lines="three"
    density="compact"
    select-strategy="classic"
    class="action-item-group-list"
  >
    <VListSubheader>General</VListSubheader>

    <VListItem value="notifications">
      <template #prepend="{ isActive }">
        <VListItemAction start>
          <VCheckbox
            :model-value="isActive"
            color="primary"
            class="mt-2"
          />
        </VListItemAction>
      </template>

      <VListItemTitle>Notifications</VListItemTitle>
      <VListItemSubtitle>Notify me about updates to apps or games that I downloaded</VListItemSubtitle>
    </VListItem>

    <VListItem value="sound">
      <template #prepend="{ isActive }">
        <VListItemAction start>
          <VCheckbox
            :model-value="isActive"
            color="primary"
            class="mt-2"
          />
        </VListItemAction>
      </template>

      <VListItemTitle>Sound</VListItemTitle>
      <VListItemSubtitle>Auto-update apps at any time. Data charges may apply</VListItemSubtitle>
    </VListItem>

    <VListItem value="widgets">
      <template #prepend="{ isActive }">
        <VListItemAction start>
          <VCheckbox
            :model-value="isActive"
            color="primary"
            class="mt-2"
          />
        </VListItemAction>
      </template>

      <VListItemTitle>Auto-add widgets</VListItemTitle>
      <VListItemSubtitle>Automatically add home screen widgets when downloads complete</VListItemSubtitle>
    </VListItem>
  </VList>
</template>
`,js:`<template>
  <VList
    lines="three"
    density="compact"
    select-strategy="classic"
    class="action-item-group-list"
  >
    <VListSubheader>General</VListSubheader>

    <VListItem value="notifications">
      <template #prepend="{ isActive }">
        <VListItemAction start>
          <VCheckbox
            :model-value="isActive"
            color="primary"
            class="mt-2"
          />
        </VListItemAction>
      </template>

      <VListItemTitle>Notifications</VListItemTitle>
      <VListItemSubtitle>Notify me about updates to apps or games that I downloaded</VListItemSubtitle>
    </VListItem>

    <VListItem value="sound">
      <template #prepend="{ isActive }">
        <VListItemAction start>
          <VCheckbox
            :model-value="isActive"
            color="primary"
            class="mt-2"
          />
        </VListItemAction>
      </template>

      <VListItemTitle>Sound</VListItemTitle>
      <VListItemSubtitle>Auto-update apps at any time. Data charges may apply</VListItemSubtitle>
    </VListItem>

    <VListItem value="widgets">
      <template #prepend="{ isActive }">
        <VListItemAction start>
          <VCheckbox
            :model-value="isActive"
            color="primary"
            class="mt-2"
          />
        </VListItemAction>
      </template>

      <VListItemTitle>Auto-add widgets</VListItemTitle>
      <VListItemSubtitle>Automatically add home screen widgets when downloads complete</VListItemSubtitle>
    </VListItem>
  </VList>
</template>
`},gt={ts:`<script setup lang="ts">
const items = ['Cras justo odio', 'Dapibus ac facilisis in', 'Morbi leo risus', 'Porta ac consectetur ac']
<\/script>

<template>
  <VList :items="items" />
</template>
`,js:`<script setup>
const items = [
  'Cras justo odio',
  'Dapibus ac facilisis in',
  'Morbi leo risus',
  'Porta ac consectetur ac',
]
<\/script>

<template>
  <VList :items="items" />
</template>
`},ft={ts:`<script lang="ts" setup>
const items = [
  { title: 'halvah icing marshmallow', value: 1 },
  { title: 'Cake caramels donut danish muffin biscuit', value: 2 },
  { title: 'Chocolate cake pie lollipop', value: 3 },
  { title: 'Apple pie toffee pudding gummi bears', value: 4 },
  { title: 'Jujubes chupa chups cheesecake tart', value: 5 },
  { title: 'Candy fruitcake bonbon sesame snaps dessert', value: 6 },
  { title: 'Candy wafer tiramisu sugar plum sweet.', value: 7 },
  { title: 'Toffee gingerbread muffin macaroon cotton candy bonbon lollipop.', value: 8 },
]
<\/script>

<template>
  <VList
    density="compact"
    :items="items"
  />
</template>
`,js:`<script setup>
const items = [
  {
    title: 'halvah icing marshmallow',
    value: 1,
  },
  {
    title: 'Cake caramels donut danish muffin biscuit',
    value: 2,
  },
  {
    title: 'Chocolate cake pie lollipop',
    value: 3,
  },
  {
    title: 'Apple pie toffee pudding gummi bears',
    value: 4,
  },
  {
    title: 'Jujubes chupa chups cheesecake tart',
    value: 5,
  },
  {
    title: 'Candy fruitcake bonbon sesame snaps dessert',
    value: 6,
  },
  {
    title: 'Candy wafer tiramisu sugar plum sweet.',
    value: 7,
  },
  {
    title: 'Toffee gingerbread muffin macaroon cotton candy bonbon lollipop.',
    value: 8,
  },
]
<\/script>

<template>
  <VList
    density="compact"
    :items="items"
  />
</template>
`},Vt={ts:`<script lang="ts" setup>
const items = [
  { title: 'My Files', value: 1, prependIcon: 'tabler-folder' },
  { title: 'Shared with me', value: 2, prependIcon: 'tabler-users' },
  { title: 'Starred', value: 3, prependIcon: 'tabler-star' },
  { title: 'Recent', value: 4, prependIcon: 'tabler-history' },
  { title: 'Offline', value: 5, prependIcon: 'tabler-circle-check' },
  { title: 'Uploads', value: 6, prependIcon: 'tabler-upload' },
  { title: 'Backups', value: 7, prependIcon: 'tabler-cloud-upload' },
]
<\/script>

<template>
  <VList
    nav
    :lines="false"
  >
    <VListItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
    >
      <template #prepend>
        <VIcon :icon="item.prependIcon" />
      </template>

      <VListItemTitle>
        {{ item.title }}
      </VListItemTitle>
    </VListItem>
  </VList>
</template>
`,js:`<script setup>
const items = [
  {
    title: 'My Files',
    value: 1,
    prependIcon: 'tabler-folder',
  },
  {
    title: 'Shared with me',
    value: 2,
    prependIcon: 'tabler-users',
  },
  {
    title: 'Starred',
    value: 3,
    prependIcon: 'tabler-star',
  },
  {
    title: 'Recent',
    value: 4,
    prependIcon: 'tabler-history',
  },
  {
    title: 'Offline',
    value: 5,
    prependIcon: 'tabler-circle-check',
  },
  {
    title: 'Uploads',
    value: 6,
    prependIcon: 'tabler-upload',
  },
  {
    title: 'Backups',
    value: 7,
    prependIcon: 'tabler-cloud-upload',
  },
]
<\/script>

<template>
  <VList
    nav
    :lines="false"
  >
    <VListItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
    >
      <template #prepend>
        <VIcon :icon="item.prependIcon" />
      </template>

      <VListItemTitle>
        {{ item.title }}
      </VListItemTitle>
    </VListItem>
  </VList>
</template>
`},Lt={ts:`<script setup lang="ts">
interface Language {
  'react': string
  'bootstrap': string
  'vue': string
  'angular': string
  'javascript': string
}

interface Progress {
  avatar: string
  title: string
  language: keyof Language
  amount: number
}

const languageProgress: Progress[] = [
  {
    avatar: 'tabler-brand-react',
    title: 'React is a JavaScript library for building user interfaces',
    language: 'react',
    amount: 90,
  },
  {
    avatar: 'tabler-brand-bootstrap',
    title: 'Bootstrap is an open source toolkit',
    language: 'bootstrap',
    amount: 80,
  },
  {
    avatar: 'tabler-brand-vue',
    title: 'Vue.js is the Progressive JavaScript Framework',
    language: 'vue',
    amount: 65,
  },
  {
    avatar: 'tabler-brand-angular',
    title: 'Angular implements Functional Programming concepts',
    language: 'angular',
    amount: 75,
  },
  {
    avatar: 'tabler-brand-javascript',
    title: 'JavaScript is the programming language of the Web',
    language: 'javascript',
    amount: 70,
  },
]

const resolveStatusColor: Language = {
  react: 'info',
  bootstrap: 'primary',
  vue: 'success',
  angular: 'error',
  javascript: 'warning',
}
<\/script>

<template>
  <VList
    lines="two"
    border
  >
    <template
      v-for="(progress, index) of languageProgress"
      :key="progress.language"
    >
      <VListItem>
        <template #prepend>
          <VAvatar
            size="36"
            rounded
            variant="tonal"
            :icon="progress.avatar"
            :color="resolveStatusColor[progress.language]"
          />
        </template>

        <VListItemTitle>
          {{ progress.title }}
        </VListItemTitle>

        <VListItemSubtitle class="mt-2">
          <VProgressLinear
            height="6"
            rounded
            :model-value="progress.amount"
            bg-color="secondary"
            :color="resolveStatusColor[progress.language]"
          />
        </VListItemSubtitle>
      </VListItem>

      <VDivider v-if="index !== languageProgress.length - 1" />
    </template>
  </VList>
</template>
`,js:`<script setup>
const languageProgress = [
  {
    avatar: 'tabler-brand-react',
    title: 'React is a JavaScript library for building user interfaces',
    language: 'react',
    amount: 90,
  },
  {
    avatar: 'tabler-brand-bootstrap',
    title: 'Bootstrap is an open source toolkit',
    language: 'bootstrap',
    amount: 80,
  },
  {
    avatar: 'tabler-brand-vue',
    title: 'Vue.js is the Progressive JavaScript Framework',
    language: 'vue',
    amount: 65,
  },
  {
    avatar: 'tabler-brand-angular',
    title: 'Angular implements Functional Programming concepts',
    language: 'angular',
    amount: 75,
  },
  {
    avatar: 'tabler-brand-javascript',
    title: 'JavaScript is the programming language of the Web',
    language: 'javascript',
    amount: 70,
  },
]

const resolveStatusColor = {
  react: 'info',
  bootstrap: 'primary',
  vue: 'success',
  angular: 'error',
  javascript: 'warning',
}
<\/script>

<template>
  <VList
    lines="two"
    border
  >
    <template
      v-for="(progress, index) of languageProgress"
      :key="progress.language"
    >
      <VListItem>
        <template #prepend>
          <VAvatar
            size="36"
            rounded
            variant="tonal"
            :icon="progress.avatar"
            :color="resolveStatusColor[progress.language]"
          />
        </template>

        <VListItemTitle>
          {{ progress.title }}
        </VListItemTitle>

        <VListItemSubtitle class="mt-2">
          <VProgressLinear
            height="6"
            rounded
            :model-value="progress.amount"
            bg-color="secondary"
            :color="resolveStatusColor[progress.language]"
          />
        </VListItemSubtitle>
      </VListItem>

      <VDivider v-if="index !== languageProgress.length - 1" />
    </template>
  </VList>
</template>
`},ht={ts:`<script lang="ts" setup>
const items = [
  {
    title: 'Cupcake sesame snaps dessert marzipan.',
    value: 1,
    props: {
      prependIcon: 'tabler-brand-instagram',
      rounded: 'xl',
    },
  },
  {
    title: 'Jelly beans jelly-o gummi bears chupa chups marshmallow.',
    value: 2,
    props: {
      prependIcon: 'tabler-brand-facebook',
      rounded: 'xl',
    },
  },
  {
    title: 'Bonbon macaroon gummies pie jelly',
    value: 3,
    props: {
      prependIcon: 'tabler-brand-twitter',
      rounded: 'xl',
    },
  },
  {
    title: 'halvah icing marshmallow',
    value: 4,
    props: {
      prependIcon: 'tabler-brand-instagram',
      rounded: 'xl',
    },
  },
]
<\/script>

<template>
  <VList :items="items" />
</template>
`,js:`<script setup>
const items = [
  {
    title: 'Cupcake sesame snaps dessert marzipan.',
    value: 1,
    props: {
      prependIcon: 'tabler-brand-instagram',
      rounded: 'xl',
    },
  },
  {
    title: 'Jelly beans jelly-o gummi bears chupa chups marshmallow.',
    value: 2,
    props: {
      prependIcon: 'tabler-brand-facebook',
      rounded: 'xl',
    },
  },
  {
    title: 'Bonbon macaroon gummies pie jelly',
    value: 3,
    props: {
      prependIcon: 'tabler-brand-twitter',
      rounded: 'xl',
    },
  },
  {
    title: 'halvah icing marshmallow',
    value: 4,
    props: {
      prependIcon: 'tabler-brand-instagram',
      rounded: 'xl',
    },
  },
]
<\/script>

<template>
  <VList :items="items" />
</template>
`},yt={ts:`<script lang="ts" setup>
const items = [
  { text: 'Cupcake sesame snaps dessert marzipan.', icon: 'tabler-brand-instagram' },
  { text: 'Jelly beans jelly-o gummi bears chupa chups marshmallow.', icon: 'tabler-brand-facebook' },
  { text: 'Bonbon macaroon gummies pie jelly', icon: 'tabler-brand-twitter' },
]
<\/script>

<template>
  <VList>
    <VListItem
      v-for="(item, i) in items"
      :key="i"
      :value="item.text"
      rounded="shaped"
    >
      <template #prepend>
        <VIcon :icon="item.icon" />
      </template>
      <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
      <VListItemTitle v-text="item.text" />
    </VListItem>
  </VList>
</template>
`,js:`<script setup>
const items = [
  {
    text: 'Cupcake sesame snaps dessert marzipan.',
    icon: 'tabler-brand-instagram',
  },
  {
    text: 'Jelly beans jelly-o gummi bears chupa chups marshmallow.',
    icon: 'tabler-brand-facebook',
  },
  {
    text: 'Bonbon macaroon gummies pie jelly',
    icon: 'tabler-brand-twitter',
  },
]
<\/script>

<template>
  <VList>
    <VListItem
      v-for="(item, i) in items"
      :key="i"
      :value="item.text"
      rounded="shaped"
    >
      <template #prepend>
        <VIcon :icon="item.icon" />
      </template>
      <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
      <VListItemTitle v-text="item.text" />
    </VListItem>
  </VList>
</template>
`},_t={ts:`<script lang="ts" setup>
const open = ref(['Users', 'Admin'])

const admins = [
  ['Management', 'tabler-users'],
  ['Settings', 'tabler-settings'],
]

const cruds = [
  ['Create', 'tabler-plus'],
  ['Read', 'tabler-file'],
  ['Update', 'tabler-reload'],
  ['Delete', 'tabler-trash'],
]
<\/script>

<template>
  <VList v-model:opened="open">
    <VListItem
      prepend-icon="tabler-home"
      title="Home"
      value="Home"
    />

    <VListGroup value="Users">
      <template #activator="{ props }">
        <VListItem
          v-bind="props"
          prepend-icon="tabler-users"
          title="Users"
        />
      </template>

      <VListGroup value="Admin">
        <template #activator="{ props }">
          <VListItem
            v-bind="props"
            title="Admin"
          />
        </template>

        <VListItem
          v-for="([title, icon], i) in admins"
          :key="i"
          :value="title"
          :title="title"
          :prepend-icon="icon"
        />
      </VListGroup>

      <VListGroup value="Actions">
        <template #activator="{ props }">
          <VListItem
            v-bind="props"
            title="Actions"
          />
        </template>

        <VListItem
          v-for="([title, icon], i) in cruds"
          :key="i"
          :value="title"
          :title="title"
          :prepend-icon="icon"
        />
      </VListGroup>
    </VListGroup>
  </VList>
</template>
`,js:`<script setup>
const open = ref([
  'Users',
  'Admin',
])

const admins = [
  [
    'Management',
    'tabler-users',
  ],
  [
    'Settings',
    'tabler-settings',
  ],
]

const cruds = [
  [
    'Create',
    'tabler-plus',
  ],
  [
    'Read',
    'tabler-file',
  ],
  [
    'Update',
    'tabler-reload',
  ],
  [
    'Delete',
    'tabler-trash',
  ],
]
<\/script>

<template>
  <VList v-model:opened="open">
    <VListItem
      prepend-icon="tabler-home"
      title="Home"
      value="Home"
    />

    <VListGroup value="Users">
      <template #activator="{ props }">
        <VListItem
          v-bind="props"
          prepend-icon="tabler-users"
          title="Users"
        />
      </template>

      <VListGroup value="Admin">
        <template #activator="{ props }">
          <VListItem
            v-bind="props"
            title="Admin"
          />
        </template>

        <VListItem
          v-for="([title, icon], i) in admins"
          :key="i"
          :value="title"
          :title="title"
          :prepend-icon="icon"
        />
      </VListGroup>

      <VListGroup value="Actions">
        <template #activator="{ props }">
          <VListItem
            v-bind="props"
            title="Actions"
          />
        </template>

        <VListItem
          v-for="([title, icon], i) in cruds"
          :key="i"
          :value="title"
          :title="title"
          :prepend-icon="icon"
        />
      </VListGroup>
    </VListGroup>
  </VList>
</template>
`},It={ts:`<script lang="ts" setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'

const items = [
  { type: 'subheader', title: 'Today' },
  {
    prependAvatar: avatar1,
    title: 'Brunch this weekend?',
    subtitle: '<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: avatar2,
    title: 'Summer BBQ',
    subtitle: '<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: avatar3,
    title: 'Oui oui',
    subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: avatar4,
    title: 'Birthday gift',
    subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
  },
]
<\/script>

<template>
  <VList
    lines="three"
    :items="items"
    item-props
  >
    <template #subtitle="{ subtitle }">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="subtitle" />
    </template>
  </VList>
</template>
`,js:`<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'

const items = [
  {
    type: 'subheader',
    title: 'Today',
  },
  {
    prependAvatar: avatar1,
    title: 'Brunch this weekend?',
    subtitle: '<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?',
  },
  {
    type: 'divider',
    inset: true,
  },
  {
    prependAvatar: avatar2,
    title: 'Summer BBQ',
    subtitle: '<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.',
  },
  {
    type: 'divider',
    inset: true,
  },
  {
    prependAvatar: avatar3,
    title: 'Oui oui',
    subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
  },
  {
    type: 'divider',
    inset: true,
  },
  {
    prependAvatar: avatar4,
    title: 'Birthday gift',
    subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
  },
]
<\/script>

<template>
  <VList
    lines="three"
    :items="items"
    item-props
  >
    <template #subtitle="{ subtitle }">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="subtitle" />
    </template>
  </VList>
</template>
`},At={ts:`<script lang="ts" setup>
const files = [
  {
    color: 'blue',
    icon: 'tabler-clipboard-text',
    subtitle: 'Jan 20, 2014',
    title: 'Vacation itinerary',
  },
  {
    color: 'amber',
    icon: 'tabler-device-mobile-rotated',
    subtitle: 'Jan 10, 2014',
    title: 'Kitchen remodel',
  },
]

const folders = [
  {
    subtitle: 'Jan 9, 2014',
    title: 'Photos',
  },
  {
    subtitle: 'Jan 17, 2014',
    title: 'Recipes',
  },
  {
    subtitle: 'Jan 28, 2014',
    title: 'Work',
  },
]
<\/script>

<template>
  <VList lines="two">
    <VListSubheader inset>
      Folders
    </VListSubheader>

    <VListItem
      v-for="folder in folders"
      :key="folder.title"
      :title="folder.title"
      :subtitle="folder.subtitle"
    >
      <template #prepend>
        <VAvatar
          color="secondary"
          variant="tonal"
        >
          <VIcon
            :size="26"
            icon="tabler-folder"
          />
        </VAvatar>
      </template>

      <template #append>
        <VBtn
          variant="text"
          color="default"
          size="small"
          icon="tabler-info-circle"
        />
      </template>
    </VListItem>

    <VDivider inset />

    <VListSubheader inset>
      Files
    </VListSubheader>

    <VListItem
      v-for="file in files"
      :key="file.title"
      :title="file.title"
      :subtitle="file.subtitle"
    >
      <template #prepend>
        <VAvatar
          color="secondary"
          variant="tonal"
        >
          <VIcon
            :size="26"
            :icon="file.icon"
          />
        </VAvatar>
      </template>

      <template #append>
        <VBtn
          variant="text"
          color="default"
          size="small"
          icon="tabler-info-circle"
        />
      </template>
    </VListItem>
  </VList>
</template>
`,js:`<script setup>
const files = [
  {
    color: 'blue',
    icon: 'tabler-clipboard-text',
    subtitle: 'Jan 20, 2014',
    title: 'Vacation itinerary',
  },
  {
    color: 'amber',
    icon: 'tabler-device-mobile-rotated',
    subtitle: 'Jan 10, 2014',
    title: 'Kitchen remodel',
  },
]

const folders = [
  {
    subtitle: 'Jan 9, 2014',
    title: 'Photos',
  },
  {
    subtitle: 'Jan 17, 2014',
    title: 'Recipes',
  },
  {
    subtitle: 'Jan 28, 2014',
    title: 'Work',
  },
]
<\/script>

<template>
  <VList lines="two">
    <VListSubheader inset>
      Folders
    </VListSubheader>

    <VListItem
      v-for="folder in folders"
      :key="folder.title"
      :title="folder.title"
      :subtitle="folder.subtitle"
    >
      <template #prepend>
        <VAvatar
          color="secondary"
          variant="tonal"
        >
          <VIcon
            :size="26"
            icon="tabler-folder"
          />
        </VAvatar>
      </template>

      <template #append>
        <VBtn
          variant="text"
          color="default"
          size="small"
          icon="tabler-info-circle"
        />
      </template>
    </VListItem>

    <VDivider inset />

    <VListSubheader inset>
      Files
    </VListSubheader>

    <VListItem
      v-for="file in files"
      :key="file.title"
      :title="file.title"
      :subtitle="file.subtitle"
    >
      <template #prepend>
        <VAvatar
          color="secondary"
          variant="tonal"
        >
          <VIcon
            :size="26"
            :icon="file.icon"
          />
        </VAvatar>
      </template>

      <template #append>
        <VBtn
          variant="text"
          color="default"
          size="small"
          icon="tabler-info-circle"
        />
      </template>
    </VListItem>
  </VList>
</template>
`},xt={ts:`<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'

interface Status {
  'Online': string
  'Away': string
  'Offline': string
  'In Meeting': string
}

interface Users {
  avatar: string
  name: string
  status: keyof Status
  lastVisited: string
}

const users: Users[] = [
  {
    avatar: avatar1,
    name: 'Caroline Black',
    status: 'Online',
    lastVisited: '13 minutes ago',
  },
  {
    avatar: avatar2,
    name: 'Alfred Copeland',
    status: 'Away',
    lastVisited: '11 minutes ago',
  },
  {
    avatar: avatar3,
    name: 'Celia Schneider',
    status: 'Offline',
    lastVisited: '9 minutes ago',
  },
  {
    avatar: avatar4,
    name: 'Max Rogan',
    status: 'In Meeting',
    lastVisited: '28 minutes ago',
  },
]

const resolveStatusColor: Status = {
  'Online': 'success',
  'Away': 'warning',
  'Offline': 'secondary',
  'In Meeting': 'error',
}
<\/script>

<template>
  <VList
    lines="two"
    border
  >
    <template
      v-for="(user, index) of users"
      :key="user.name"
    >
      <VListItem>
        <template #prepend>
          <VAvatar :image="user.avatar" />
        </template>
        <VListItemTitle>
          {{ user.name }}
        </VListItemTitle>
        <VListItemSubtitle class="mt-1">
          <VBadge
            dot
            location="start center"
            offset-x="2"
            :color="resolveStatusColor[user.status]"
            class="me-3"
          >
            <span class="ms-4">{{ user.status }}</span>
          </VBadge>

          <span class="text-xs text-disabled">{{ user.lastVisited }}</span>
        </VListItemSubtitle>

        <template #append>
          <VBtn size="small">
            Add
          </VBtn>
        </template>
      </VListItem>
      <VDivider v-if="index !== users.length - 1" />
    </template>
  </VList>
</template>
`,js:`<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'

const users = [
  {
    avatar: avatar1,
    name: 'Caroline Black',
    status: 'Online',
    lastVisited: '13 minutes ago',
  },
  {
    avatar: avatar2,
    name: 'Alfred Copeland',
    status: 'Away',
    lastVisited: '11 minutes ago',
  },
  {
    avatar: avatar3,
    name: 'Celia Schneider',
    status: 'Offline',
    lastVisited: '9 minutes ago',
  },
  {
    avatar: avatar4,
    name: 'Max Rogan',
    status: 'In Meeting',
    lastVisited: '28 minutes ago',
  },
]

const resolveStatusColor = {
  'Online': 'success',
  'Away': 'warning',
  'Offline': 'secondary',
  'In Meeting': 'error',
}
<\/script>

<template>
  <VList
    lines="two"
    border
  >
    <template
      v-for="(user, index) of users"
      :key="user.name"
    >
      <VListItem>
        <template #prepend>
          <VAvatar :image="user.avatar" />
        </template>
        <VListItemTitle>
          {{ user.name }}
        </VListItemTitle>
        <VListItemSubtitle class="mt-1">
          <VBadge
            dot
            location="start center"
            offset-x="2"
            :color="resolveStatusColor[user.status]"
            class="me-3"
          >
            <span class="ms-4">{{ user.status }}</span>
          </VBadge>

          <span class="text-xs text-disabled">{{ user.lastVisited }}</span>
        </VListItemSubtitle>

        <template #append>
          <VBtn size="small">
            Add
          </VBtn>
        </template>
      </VListItem>
      <VDivider v-if="index !== users.length - 1" />
    </template>
  </VList>
</template>
`},Ft={__name:"list",setup(v){return(a,s)=>{const c=vt,l=q,r=ct,p=dt,_=mt,I=ut,M=nt,H=rt,O=lt,R=st,F=tt,N=Z;return n(),d(X,{class:"match-height"},{default:e(()=>[t(b,{cols:"12",md:"6"},{default:e(()=>[t(l,{title:"Basic","no-padding":"",code:gt},{default:e(()=>[t(o,null,{default:e(()=>s[0]||(s[0]=[u("code",null,"v-list",-1),i(" component can contain an avatar, content, actions and much more.")])),_:1}),t(o,null,{default:e(()=>[t(c)]),_:1})]),_:1},8,["code"])]),_:1}),t(b,{cols:"12",md:"6"},{default:e(()=>[t(l,{title:"Rounded","no-padding":"",code:ht},{default:e(()=>[t(o,null,{default:e(()=>s[1]||(s[1]=[i("You can make "),u("code",null,"v-list-item",-1),i(" rounded using "),u("code",null,"rounded",-1),i(" prop.")])),_:1}),t(o,null,{default:e(()=>[t(r)]),_:1})]),_:1},8,["code"])]),_:1}),t(b,{cols:"12",md:"6"},{default:e(()=>[t(l,{title:"Density",code:ft,"no-padding":""},{default:e(()=>[t(o,null,{default:e(()=>s[2]||(s[2]=[i("Use "),u("code",null,"density",-1),i(" prop to adjusts the spacing within the component. Available options are: "),u("code",null,"default",-1),i(", "),u("code",null,"comfortable",-1),i(", and "),u("code",null,"compact",-1),i(".")])),_:1}),t(o,null,{default:e(()=>[t(p)]),_:1})]),_:1},8,["code"])]),_:1}),t(b,{cols:"12",md:"6"},{default:e(()=>[t(l,{title:"Nav","no-padding":"",code:Vt},{default:e(()=>[t(o,null,{default:e(()=>s[3]||(s[3]=[i("Lists can receive an alternative "),u("code",null,"nav",-1),i(" styling that reduces the width "),u("code",null,"v-list-item",-1),i(" takes up as well as adding a border radius.")])),_:1}),t(o,null,{default:e(()=>[t(_)]),_:1})]),_:1},8,["code"])]),_:1}),t(b,{cols:"12",md:"6"},{default:e(()=>[t(l,{title:"Action and item group","no-padding":"",code:bt},{default:e(()=>[t(o,null,{default:e(()=>s[4]||(s[4]=[i("A "),u("code",null,"three-line",-1),i(" list with actions. Utilizing "),u("code",null,"v-list-group",-1),i(", easily connect actions to your tiles.")])),_:1}),t(o,null,{default:e(()=>[t(I)]),_:1})]),_:1},8,["code"])]),_:1}),t(b,{cols:"12",md:"6"},{default:e(()=>[t(l,{title:"Sub Group","no-padding":"",code:_t},{default:e(()=>[t(o,null,{default:e(()=>s[5]||(s[5]=[i(" Using the "),u("code",null,"v-list-group",-1),i(" component you can create up to 2 levels in depth using the sub-group prop. ")])),_:1}),t(o,null,{default:e(()=>[t(M)]),_:1})]),_:1},8,["code"])]),_:1}),t(b,{cols:"12",md:"6"},{default:e(()=>[t(l,{title:"Two lines and subheader","no-padding":"",code:At},{default:e(()=>[t(o,null,{default:e(()=>s[6]||(s[6]=[i("Lists can contain subheaders, dividers, and can contain 1 or more lines. The subtitle will overflow with ellipsis if it extends past one line.")])),_:1}),t(o,null,{default:e(()=>[t(H)]),_:1})]),_:1},8,["code"])]),_:1}),t(b,{cols:"12",md:"6"},{default:e(()=>[t(l,{title:"Three Line","no-padding":"",code:It},{default:e(()=>[t(o,null,{default:e(()=>s[7]||(s[7]=[i("For three line lists, the subtitle will clamp vertically at 2 lines and then ellipsis. This feature uses line-clamp and is not supported in all browsers.")])),_:1}),t(o,null,{default:e(()=>[t(O)]),_:1})]),_:1},8,["code"])]),_:1}),t(b,{cols:"12",md:"6"},{default:e(()=>[t(l,{title:"User List","no-padding":"",code:xt},{default:e(()=>[t(o,null,{default:e(()=>[t(R)]),_:1})]),_:1},8,["code"])]),_:1}),t(b,{cols:"12",md:"6"},{default:e(()=>[t(l,{title:"Progress List","no-padding":"",code:Lt},{default:e(()=>[t(o,null,{default:e(()=>[t(F)]),_:1})]),_:1},8,["code"])]),_:1}),t(b,{cols:"12",md:"6"},{default:e(()=>[t(l,{title:"Shaped","no-padding":"",code:yt},{default:e(()=>[t(o,null,{default:e(()=>s[8]||(s[8]=[i(" Shaped lists have rounded borders on one side of the "),u("code",null,"v-list-item",-1),i(". ")])),_:1}),t(o,null,{default:e(()=>[t(N)]),_:1})]),_:1},8,["code"])]),_:1})]),_:1})}}};export{Ft as default};
