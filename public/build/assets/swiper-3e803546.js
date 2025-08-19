import{r as L,o as s,c as n,d as f,F as w,i as m,x as U,n as e,b as r,e as t,v as x,a$ as y,aj as k,_ as h,a1 as q,f as oe}from"./main-b871c247.js";import{r as g}from"./swiper-element-bundle-1d28e61d.js";import{V as b}from"./VImg-8fc3d1b5.js";import{V as H}from"./VCardText-de098736.js";import{V as J}from"./VCard-b2c7daaa.js";import{_ as le}from"./AppCardCode-32f36ed7.js";import{V as we,a as d}from"./VRow-6fcd1b0a.js";import"./VAvatar-8e3ed6ed.js";import"./VDivider-adb1395f.js";const me={class:"swiper-virtual"},ce=["slides"],de={class:"d-flex justify-center gap-4 flex-wrap"},ge={__name:"DemoSwiperVirtualSlides",setup(c){g();const l=Array.from({length:500},(u,a)=>`Slides ${a+1}`),o=L(null),i=L(1),p=L(500),j=u=>{var a;(a=o.value)==null||a.swiper.slideTo(u-1)},T=()=>{var u;(u=o.value)==null||u.swiper.prependSlide([`<swiper-slide>Slide ${--i.value} </swiper-slide>`,`<swiper-slide>Slide ${--i.value} </swiper-slide>`])},A=()=>{var u;(u=o.value)==null||u.swiper.appendSlide([`<swiper-slide>Slide ${++p.value} </swiper-slide>`])};return(u,a)=>(s(),n("section",me,[f("swiper-container",{ref_key:"swiperEl",ref:o,virtual:"true",slides:e(l),navigation:"true","slides-per-view":"5","space-between":"50","free-mode":"true","events-prefix":"swiper-",breakpoints:{1024:{slidesPerView:4,spaceBetween:40},768:{slidesPerView:3,spaceBetween:30},640:{slidesPerView:2,spaceBetween:20},320:{slidesPerView:1,spaceBetween:10}}},[(s(!0),n(w,null,m(e(l),(_,O)=>(s(),n("swiper-slide",{key:O},U(_),1))),128))],8,ce),f("div",de,[r(k,{variant:"outlined",color:"primary",onClick:y(T,["prevent"])},{default:t(()=>a[3]||(a[3]=[x(" Prepend 2 Slides ")])),_:1}),r(k,{variant:"outlined",color:"primary",onClick:a[0]||(a[0]=y(_=>j(1),["prevent"]))},{default:t(()=>a[4]||(a[4]=[x(" Slide 1 ")])),_:1}),r(k,{variant:"outlined",color:"primary",onClick:a[1]||(a[1]=y(_=>j(250),["prevent"]))},{default:t(()=>a[5]||(a[5]=[x(" Slide 250 ")])),_:1}),r(k,{variant:"outlined",color:"primary",onClick:a[2]||(a[2]=y(_=>j(500),["prevent"]))},{default:t(()=>a[6]||(a[6]=[x(" Slide 500 ")])),_:1}),r(k,{variant:"outlined",color:"primary",onClick:y(A,["prevent"])},{default:t(()=>a[7]||(a[7]=[x(" Append Slide ")])),_:1})])]))}},z="/build/assets/banner-31-962e2019.jpg",B="/build/assets/banner-32-fdc9818f.jpg",C="/build/assets/banner-33-592a41a1.jpg",D="/build/assets/banner-34-2611033b.jpg",G="/build/assets/banner-35-49adbb94.jpg",K="/build/assets/banner-36-28dffb99.jpg",W="/build/assets/banner-37-6916f72e.jpg",X="/build/assets/5-f951b35f.jpg",$="/build/assets/banner-39-d16bfc70.jpg",be={"pagination-clickable":"true","slides-per-view":"5","space-between":"50","events-prefix":"swiper-",breakpoints:{1024:{slidesPerView:4,spaceBetween:40},768:{slidesPerView:3,spaceBetween:30},640:{slidesPerView:2,spaceBetween:20},320:{slidesPerView:1,spaceBetween:10}}},ue={__name:"DemoSwiperResponsiveBreakpoints",setup(c){return g(),(l,o)=>(s(),n("swiper-container",be,[(s(!0),n(w,null,m([e(z),e(B),e(C),e(D),e(G),e(K),e(W),e(X),e($)],i=>(s(),n("swiper-slide",{key:i},[r(b,{src:i},null,8,["src"])]))),128))]))}},P="/build/assets/banner-20-fe7c08de.jpg",E="/build/assets/banner-4-0d9cfc59.jpg",Y="/build/assets/banner-5-c4ac71d2.jpg",v="/build/assets/banner-7-b965dcfc.jpg",N="/build/assets/banner-8-b140c08a.jpg",F="/build/assets/banner-9-581ecd34.jpg",fe={"pagination-clickable":"true",autoplay:"true",navigation:"true","events-prefix":"swiper-"},_e={__name:"DemoSwiperLazyLoading",setup(c){return g(),(l,o)=>(s(),n("swiper-container",fe,[(s(!0),n(w,null,m([e(E),e(Y),e(F),e(v),e(N),e(P)],i=>(s(),n("swiper-slide",{key:i,lazy:"true"},[r(b,{src:i,cover:"",loading:"lazy"},null,8,["src"])]))),128))]))}},S="/build/assets/banner-11-816dcf10.jpg",V="/build/assets/6-cda15124.jpg",I="/build/assets/banner-13-de0fd933.jpg",M="/build/assets/banner-15-58e1b379.jpg",Q="/build/assets/banner-16-372fad4e.jpg";const ve={class:"mySwiper","thumbs-swiper":".mySwiper2",loop:"true","space-between":"10",navigation:"true","centered-slides":"true","events-prefix":"swiper-"},je={class:"mySwiper2",loop:"true","free-mode":"true","events-prefix":"swiper-","slides-per-view":"4"},xe={__name:"DemoSwiperGallery",setup(c){return g(),(l,o)=>(s(),n(w,null,[f("swiper-container",ve,[(s(!0),n(w,null,m([e(S),e(V),e(I),e(M),e(Q),e(S),e(V),e(I)],i=>(s(),n("swiper-slide",{key:i},[r(b,{src:i,cover:""},null,8,["src"])]))),128))]),f("swiper-container",je,[(s(!0),n(w,null,m([e(S),e(V),e(I),e(M),e(Q),e(S),e(V),e(I)],i=>(s(),n("swiper-slide",{key:i},[r(b,{src:i,cover:""},null,8,["src"])]))),128))])],64))}},ye=h(xe,[["__scopeId","data-v-6f9e604e"]]),ke="/build/assets/banner-10-ed241625.jpg",Se={pagination:"true",navigation:"true",autoplay:"true","centered-slides":"true","events-prefix":"swiper-"},Ve={__name:"DemoSwiperAutoplay",setup(c){return g(),(l,o)=>(s(),n("swiper-container",Se,[(s(!0),n(w,null,m([e(v),e(N),e(F),e(ke),e(S),e(P)],i=>(s(),n("swiper-slide",{key:i},[r(b,{src:i,cover:""},null,8,["src"])]))),128))]))}};const Ie={pagination:"true",effect:"coverflow","grab-cursor":"true","centered-slides":"true","slides-per-view":"auto","coverflow-effect-rotate":"50","coverflow-effect-stretch":"0","coverflow-effect-depth":"100","coverflow-effect-modifier":"1","coverflow-effect-slide-shadows":"true","events-prefix":"swiper-"},he={__name:"DemoSwiperCoverflowEffect",setup(c){return g(),(l,o)=>(s(),n("swiper-container",Ie,[(s(!0),n(w,null,m([e(z),e(B),e(C),e(D),e(G),e(K),e(W),e(X),e($)],i=>(s(),n("swiper-slide",{key:i},[r(b,{src:i},null,8,["src"])]))),128))]))}},Be=h(he,[["__scopeId","data-v-ee43cbca"]]),Pe="/build/assets/banner-21-c1fbae97.jpg",$e="/build/assets/banner-23-727a12a9.jpg",ze="/build/assets/banner-24-245f40ad.jpg";const Ce={pagination:"true","centered-slides":"true",effect:"cube","grab-cursor":"true","cube-effect-shadow":"true","cube-effect-slide-shadows":"true","cube-effect-shadow-scale":"0.94","events-prefix":"swiper-"},De={__name:"DemoSwiperCubeEffect",setup(c){return g(),(l,o)=>(s(),n("swiper-container",Ce,[(s(!0),n(w,null,m([e(Pe),e(B),e($e),e(ze)],i=>(s(),n("swiper-slide",{key:i},[r(b,{src:i},null,8,["src"])]))),128))]))}},Ge=h(De,[["__scopeId","data-v-43e4acc8"]]),Ee="/build/assets/banner-17-a12e427a.jpg",Ne="/build/assets/banner-18-877908eb.jpg",Te="/build/assets/banner-19-e278c9af.jpg",Ae={"space-between":"30",pagination:"true",navigation:"true",effect:"fade","events-prefix":"swiper-"},Oe={__name:"DemoSwiperFade",setup(c){return g(),(l,o)=>(s(),n("swiper-container",Ae,[(s(!0),n(w,null,m([e(P),e(Te),e(Ne),e(Ee),e(Q)],i=>(s(),n("swiper-slide",{key:i},[r(b,{src:i},null,8,["src"])]))),128))]))}};const Le={"centered-slides":"true","space-between":"30","slides-per-view":"1","events-prefix":"swiper-",breakpoints:{992:{slidesPerView:4,spaceBetween:30},780:{slidesPerView:3,spaceBetween:30},460:{slidesPerView:2,spaceBetween:30}}},Qe={class:"d-flex align-center gap-x-3"},Ue={class:"font-weight-medium"},Fe={__name:"DemoSwiperCenteredSlidesOption2",setup(c){return g(),(l,o)=>(s(),n("swiper-container",Le,[(s(),n(w,null,m([{icon:"tabler-brand-github",text:"Getting Started"},{icon:"tabler-brand-facebook",text:"Pricing & Plans"},{icon:"tabler-brand-twitter",text:"Sales Question"},{icon:"tabler-brand-instagram",text:"Usage Guidelines"},{icon:"tabler-brand-gitlab",text:"General Guide"}],({icon:i,text:p})=>f("swiper-slide",{key:p},[r(J,{class:"bg-default"},{default:t(()=>[r(H,null,{default:t(()=>[f("div",Qe,[r(q,{icon:i,size:"28"},null,8,["icon"]),f("span",Ue,U(p),1)])]),_:2},1024)]),_:2},1024)])),64))]))}},Me=h(Fe,[["__scopeId","data-v-a5c52482"]]);const Re={class:"swiper-centered-slide"},qe={navigation:"true","centered-slides":"true","space-between":"30","slides-per-view":"1","events-prefix":"swiper-",injectStyles:[`
        .swiper-button-next, .swiper-button-prev{
          background: rgb(var(--v-theme-primary)) !important;
          color: #fff !important;
          padding-inline: 0.45rem !important;
          padding-block: 0.45rem !important;
          inline-size: 1rem !important;
          block-size: 1rem !important;
          border-radius: 50%
        }
        `],breakpoints:{992:{slidesPerView:4,spaceBetween:30},780:{slidesPerView:3,spaceBetween:30},460:{slidesPerView:2,spaceBetween:20}}},He={class:"d-flex flex-column align-center gap-y-3"},Je={class:"text-high-emphasis"},Ke={__name:"DemoSwiperCenteredSlidesOption1",setup(c){return g(),(l,o)=>(s(),n("div",Re,[f("swiper-container",qe,[(s(),n(w,null,m([{icon:"tabler-brand-github",text:"Getting Started"},{icon:"tabler-brand-facebook",text:"Pricing & Plans"},{icon:"tabler-brand-twitter",text:"Sales Question"},{icon:"tabler-brand-instagram",text:"Usage Guidelines"},{icon:"tabler-brand-gitlab",text:"General Guide"}],({icon:i,text:p})=>f("swiper-slide",{key:p},[r(J,null,{default:t(()=>[r(H,null,{default:t(()=>[f("div",He,[r(q,{icon:i,size:"28"},null,8,["icon"]),f("span",Je,U(p),1)])]),_:2},1024)]),_:2},1024)])),64))])]))}},We=h(Ke,[["__scopeId","data-v-e4133d49"]]),R="/build/assets/banner-26-b86f7af5.jpg",Xe="/build/assets/banner-28-1f97256e.jpg",Ye="/build/assets/banner-29-99ced7e1.jpg",Ze="/build/assets/banner-30-0b905b11.jpg",er={"slides-per-view":"4","grid-fill":"rows","space-between":"30","grid-rows":"2","pagination-clickable":"true","events-prefix":"swiper-"},rr={__name:"DemoSwiperGrid",setup(c){return g(),(l,o)=>(s(),n("swiper-container",er,[(s(!0),n(w,null,m([e(R),e($),e(Xe),e(Ye),e(Ze),e(z),e(B),e(C),e(D),e(G),e(R),e($)],i=>(s(),n("swiper-slide",{key:i},[r(b,{src:i},null,8,["src"])]))),128))]))}},ir={pagination:"true","slides-per-view":"3","space-between":"25","events-prefix":"swiper-"},sr={__name:"DemoSwiperMultipleSlidesPerView",setup(c){return g(),(l,o)=>(s(),n("swiper-container",ir,[(s(!0),n(w,null,m([e(z),e(B),e(C),e(D),e(G)],i=>(s(),n("swiper-slide",{key:i},[r(b,{src:i},null,8,["src"])]))),128))]))}},nr={navigation:"true","pagination-type":"progressbar","events-prefix":"swiper-"},tr={__name:"DemoSwiperProgress",setup(c){return g(),(l,o)=>(s(),n("swiper-container",nr,[(s(!0),n(w,null,m([e(N),e(v),e(P),e(E),e(Y)],i=>(s(),n("swiper-slide",{key:i},[r(b,{src:i},null,8,["src"])]))),128))]))}},pr={pagination:"true","events-prefix":"swiper-"},ar={__name:"DemoSwiperPagination",setup(c){return g(),(l,o)=>(s(),n("swiper-container",pr,[(s(!0),n(w,null,m([e(V),e(F),e(N),e(v),e(P)],i=>(s(),n("swiper-slide",{key:i},[r(b,{src:i},null,8,["src"])]))),128))]))}},or="/build/assets/banner-14-be6344aa.jpg",Z="/build/assets/banner-2-4b26117a.jpg",lr="/build/assets/banner-3-1916ec0c.jpg",wr={navigation:"true","events-prefix":"swiper-"},mr={__name:"DemoSwiperNavigation",setup(c){return g(),(l,o)=>(s(),n("swiper-container",wr,[(s(!0),n(w,null,m([e(v),e(E),e(or),e(lr),e(Z)],i=>(s(),n("swiper-slide",{key:i},[r(b,{src:i},null,8,["src"])]))),128))]))}},cr="/build/assets/banner-1-247dfd5e.jpg",dr={"events-prefix":"swiper-"},gr={__name:"DemoSwiperBasic",setup(c){return g(),(l,o)=>(s(),n("swiper-container",dr,[(s(!0),n(w,null,m([e(cr),e(Z),e(E),e(v),e(I)],i=>(s(),n("swiper-slide",{key:i},[r(b,{src:i},null,8,["src"])]))),128))]))}},br={ts:`<script setup lang="ts">
import { register } from 'swiper/element/bundle'
import swiper10 from '@images/banner/banner-10.jpg'
import swiper11 from '@images/banner/banner-11.jpg'
import swiper20 from '@images/banner/banner-20.jpg'
import swiper7 from '@images/banner/banner-7.jpg'
import swiper8 from '@images/banner/banner-8.jpg'
import swiper9 from '@images/banner/banner-9.jpg'

register()
<\/script>

<template>
  <swiper-container
    pagination="true"
    navigation="true"
    autoplay="true"
    centered-slides="true"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in
        [
          swiper7,
          swiper8,
          swiper9,
          swiper10,
          swiper11,
          swiper20,
        ]"
      :key="swiperImg"
    >
      <VImg
        :src="swiperImg"
        cover
      />
    </swiper-slide>
  </swiper-container>
</template>
`,js:`<script setup>
import { register } from 'swiper/element/bundle'
import swiper10 from '@images/banner/banner-10.jpg'
import swiper11 from '@images/banner/banner-11.jpg'
import swiper20 from '@images/banner/banner-20.jpg'
import swiper7 from '@images/banner/banner-7.jpg'
import swiper8 from '@images/banner/banner-8.jpg'
import swiper9 from '@images/banner/banner-9.jpg'

register()
<\/script>

<template>
  <swiper-container
    pagination="true"
    navigation="true"
    autoplay="true"
    centered-slides="true"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in
        [
          swiper7,
          swiper8,
          swiper9,
          swiper10,
          swiper11,
          swiper20,
        ]"
      :key="swiperImg"
    >
      <VImg
        :src="swiperImg"
        cover
      />
    </swiper-slide>
  </swiper-container>
</template>
`},ur={ts:`<script setup lang="ts">
import { register } from 'swiper/element/bundle'

import swiper1 from '@images/banner/banner-1.jpg'
import swiper13 from '@images/banner/banner-13.jpg'
import swiper2 from '@images/banner/banner-2.jpg'
import swiper4 from '@images/banner/banner-4.jpg'
import swiper7 from '@images/banner/banner-7.jpg'

register()
<\/script>

<template>
  <swiper-container events-prefix="swiper-">
    <swiper-slide
      v-for="swiperImg in [
        swiper1,
        swiper2,
        swiper4,
        swiper7,
        swiper13,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>
`,js:`<script setup>
import { register } from 'swiper/element/bundle'
import swiper1 from '@images/banner/banner-1.jpg'
import swiper13 from '@images/banner/banner-13.jpg'
import swiper2 from '@images/banner/banner-2.jpg'
import swiper4 from '@images/banner/banner-4.jpg'
import swiper7 from '@images/banner/banner-7.jpg'

register()
<\/script>

<template>
  <swiper-container events-prefix="swiper-">
    <swiper-slide
      v-for="swiperImg in [
        swiper1,
        swiper2,
        swiper4,
        swiper7,
        swiper13,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>
`},fr={ts:`<script setup lang="ts">
import { register } from 'swiper/element/bundle'

register()
<\/script>

<template>
  <!-- eslint-disable vue/attribute-hyphenation -->
  <div class="swiper-centered-slide">
    <swiper-container
      navigation="true"
      centered-slides="true"
      space-between="30"
      slides-per-view="1"
      events-prefix="swiper-"
      :injectStyles="[
        \`
        .swiper-button-next, .swiper-button-prev{
          background: rgb(var(--v-theme-primary)) !important;
          color: #fff !important;
          padding-inline: 0.45rem !important;
          padding-block: 0.45rem !important;
          inline-size: 1rem !important;
          block-size: 1rem !important;
          border-radius: 50%
        }
        \`,
      ]"
      :breakpoints="{
        992: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        780: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        460: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      }"
    >
      <swiper-slide
        v-for="{ icon, text } in [
          { icon: 'tabler-brand-github', text: 'Getting Started' },
          { icon: 'tabler-brand-facebook', text: 'Pricing & Plans' },
          { icon: 'tabler-brand-twitter', text: 'Sales Question' },
          { icon: 'tabler-brand-instagram', text: 'Usage Guidelines' },
          { icon: 'tabler-brand-gitlab', text: 'General Guide' },
        ]"
        :key="text"
      >
        <VCard>
          <VCardText>
            <div class="d-flex flex-column align-center gap-y-3">
              <VIcon
                :icon="icon"
                size="28"
              />
              <span class="text-high-emphasis">{{ text }}</span>
            </div>
          </VCardText>
        </VCard>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<style lang="scss" scoped>
swiper-slide {
  padding-block: 1rem;

  &.swiper-slide-active {
    .v-card {
      border: 1px solid rgb(var(--v-theme-primary));

      .v-icon {
        color: rgb(var(--v-theme-primary));
      }
    }
  }
}
</style>
`,js:`<script setup>
import { register } from 'swiper/element/bundle'

register()
<\/script>

<template>
  <!-- eslint-disable vue/attribute-hyphenation -->
  <div class="swiper-centered-slide">
    <swiper-container
      navigation="true"
      centered-slides="true"
      space-between="30"
      slides-per-view="1"
      events-prefix="swiper-"
      :injectStyles="[
        \`
        .swiper-button-next, .swiper-button-prev{
          background: rgb(var(--v-theme-primary)) !important;
          color: #fff !important;
          padding-inline: 0.45rem !important;
          padding-block: 0.45rem !important;
          inline-size: 1rem !important;
          block-size: 1rem !important;
          border-radius: 50%
        }
        \`,
      ]"
      :breakpoints="{
        992: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        780: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        460: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      }"
    >
      <swiper-slide
        v-for="{ icon, text } in [
          { icon: 'tabler-brand-github', text: 'Getting Started' },
          { icon: 'tabler-brand-facebook', text: 'Pricing & Plans' },
          { icon: 'tabler-brand-twitter', text: 'Sales Question' },
          { icon: 'tabler-brand-instagram', text: 'Usage Guidelines' },
          { icon: 'tabler-brand-gitlab', text: 'General Guide' },
        ]"
        :key="text"
      >
        <VCard>
          <VCardText>
            <div class="d-flex flex-column align-center gap-y-3">
              <VIcon
                :icon="icon"
                size="28"
              />
              <span class="text-high-emphasis">{{ text }}</span>
            </div>
          </VCardText>
        </VCard>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<style lang="scss" scoped>
swiper-slide {
  padding-block: 1rem;

  &.swiper-slide-active {
    .v-card {
      border: 1px solid rgb(var(--v-theme-primary));

      .v-icon {
        color: rgb(var(--v-theme-primary));
      }
    }
  }
}
</style>
`},_r={ts:`<script setup lang="ts">
import { register } from 'swiper/element/bundle'

register()
<\/script>

<template>
  <swiper-container
    centered-slides="true"
    space-between="30"
    slides-per-view="1"
    events-prefix="swiper-"
    :breakpoints="{
      992: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      780: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      460: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    }"
  >
    <swiper-slide
      v-for="{ icon, text } in [
        { icon: 'tabler-brand-github', text: 'Getting Started' },
        { icon: 'tabler-brand-facebook', text: 'Pricing & Plans' },
        { icon: 'tabler-brand-twitter', text: 'Sales Question' },
        { icon: 'tabler-brand-instagram', text: 'Usage Guidelines' },
        { icon: 'tabler-brand-gitlab', text: 'General Guide' },
      ]"
      :key="text"
    >
      <VCard class="bg-default">
        <VCardText>
          <div class="d-flex align-center gap-x-3">
            <VIcon
              :icon="icon"
              size="28"
            />
            <span class="font-weight-medium">{{ text }}</span>
          </div>
        </VCardText>
      </VCard>
    </swiper-slide>
  </swiper-container>
</template>

<style lang="scss" scoped>
swiper-slide {
  padding-block: 1rem;

  &.swiper-slide-active {
    .v-card {
      border: 1px solid rgb(var(--v-theme-primary));
      background: rgb(var(--v-theme-primary));
      color: rgb(var(--v-theme-on-primary));
    }
  }
}
</style>
`,js:`<script setup>
import { register } from 'swiper/element/bundle'

register()
<\/script>

<template>
  <swiper-container
    centered-slides="true"
    space-between="30"
    slides-per-view="1"
    events-prefix="swiper-"
    :breakpoints="{
      992: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      780: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      460: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    }"
  >
    <swiper-slide
      v-for="{ icon, text } in [
        { icon: 'tabler-brand-github', text: 'Getting Started' },
        { icon: 'tabler-brand-facebook', text: 'Pricing & Plans' },
        { icon: 'tabler-brand-twitter', text: 'Sales Question' },
        { icon: 'tabler-brand-instagram', text: 'Usage Guidelines' },
        { icon: 'tabler-brand-gitlab', text: 'General Guide' },
      ]"
      :key="text"
    >
      <VCard class="bg-default">
        <VCardText>
          <div class="d-flex align-center gap-x-3">
            <VIcon
              :icon="icon"
              size="28"
            />
            <span class="font-weight-medium">{{ text }}</span>
          </div>
        </VCardText>
      </VCard>
    </swiper-slide>
  </swiper-container>
</template>

<style lang="scss" scoped>
swiper-slide {
  padding-block: 1rem;

  &.swiper-slide-active {
    .v-card {
      border: 1px solid rgb(var(--v-theme-primary));
      background: rgb(var(--v-theme-primary));
      color: rgb(var(--v-theme-on-primary));
    }
  }
}
</style>
`},vr={ts:`<script setup lang="ts">
import { register } from 'swiper/element/bundle'
import swiper31 from '@images/banner/banner-31.jpg'
import swiper32 from '@images/banner/banner-32.jpg'
import swiper33 from '@images/banner/banner-33.jpg'
import swiper34 from '@images/banner/banner-34.jpg'
import swiper35 from '@images/banner/banner-35.jpg'
import swiper36 from '@images/banner/banner-36.jpg'
import swiper37 from '@images/banner/banner-37.jpg'
import swiper38 from '@images/banner/banner-38.jpg'
import swiper39 from '@images/banner/banner-39.jpg'

register()
<\/script>

<template>
  <swiper-container
    pagination="true"
    effect="coverflow"
    grab-cursor="true"
    centered-slides="true"
    slides-per-view="auto"
    coverflow-effect-rotate="50"
    coverflow-effect-stretch="0"
    coverflow-effect-depth="100"
    coverflow-effect-modifier="1"
    coverflow-effect-slide-shadows="true"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper31,
        swiper32,
        swiper33,
        swiper34,
        swiper35,
        swiper36,
        swiper37,
        swiper38,
        swiper39,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>

<style lang="scss" scoped>
swiper-slide {
  background-position: center;
  background-size: cover;
  block-size: 300px;
  inline-size: 300px;
}
</style>
`,js:`<script setup>
import { register } from 'swiper/element/bundle'
import swiper31 from '@images/banner/banner-31.jpg'
import swiper32 from '@images/banner/banner-32.jpg'
import swiper33 from '@images/banner/banner-33.jpg'
import swiper34 from '@images/banner/banner-34.jpg'
import swiper35 from '@images/banner/banner-35.jpg'
import swiper36 from '@images/banner/banner-36.jpg'
import swiper37 from '@images/banner/banner-37.jpg'
import swiper38 from '@images/banner/banner-38.jpg'
import swiper39 from '@images/banner/banner-39.jpg'

register()
<\/script>

<template>
  <swiper-container
    pagination="true"
    effect="coverflow"
    grab-cursor="true"
    centered-slides="true"
    slides-per-view="auto"
    coverflow-effect-rotate="50"
    coverflow-effect-stretch="0"
    coverflow-effect-depth="100"
    coverflow-effect-modifier="1"
    coverflow-effect-slide-shadows="true"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper31,
        swiper32,
        swiper33,
        swiper34,
        swiper35,
        swiper36,
        swiper37,
        swiper38,
        swiper39,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>

<style lang="scss" scoped>
swiper-slide {
  background-position: center;
  background-size: cover;
  block-size: 300px;
  inline-size: 300px;
}
</style>
`},jr={ts:`<script setup lang="ts">
import { register } from 'swiper/element/bundle'
import swiper21 from '@images/banner/banner-21.jpg'
import swiper23 from '@images/banner/banner-23.jpg'
import swiper24 from '@images/banner/banner-24.jpg'
import swiper32 from '@images/banner/banner-32.jpg'

register()
<\/script>

<template>
  <swiper-container
    pagination="true"
    centered-slides="true"
    effect="cube"
    grab-cursor="true"
    cube-effect-shadow="true"
    cube-effect-slide-shadows="true"
    cube-effect-shadow-scale="0.94"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper21,
        swiper32,
        swiper23,
        swiper24,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>

<style lang="scss" scoped>
swiper-slide {
  background-position: center;
  background-size: cover;
  block-size: 250px;
  inline-size: 250px;
}

swiper-container {
  margin: auto;
  block-size: 250px;
  inline-size: 250px;
}
</style>
`,js:`<script setup>
import { register } from 'swiper/element/bundle'
import swiper21 from '@images/banner/banner-21.jpg'
import swiper23 from '@images/banner/banner-23.jpg'
import swiper24 from '@images/banner/banner-24.jpg'
import swiper32 from '@images/banner/banner-32.jpg'

register()
<\/script>

<template>
  <swiper-container
    pagination="true"
    centered-slides="true"
    effect="cube"
    grab-cursor="true"
    cube-effect-shadow="true"
    cube-effect-slide-shadows="true"
    cube-effect-shadow-scale="0.94"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper21,
        swiper32,
        swiper23,
        swiper24,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>

<style lang="scss" scoped>
swiper-slide {
  background-position: center;
  background-size: cover;
  block-size: 250px;
  inline-size: 250px;
}

swiper-container {
  margin: auto;
  block-size: 250px;
  inline-size: 250px;
}
</style>
`},xr={ts:`<script setup lang="ts">
import { register } from 'swiper/element/bundle'
import swiper16 from '@images/banner/banner-16.jpg'
import swiper17 from '@images/banner/banner-17.jpg'
import swiper18 from '@images/banner/banner-18.jpg'
import swiper19 from '@images/banner/banner-19.jpg'
import swiper20 from '@images/banner/banner-20.jpg'

register()
<\/script>

<template>
  <swiper-container
    space-between="30"
    pagination="true"
    navigation="true"
    effect="fade"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper20,
        swiper19,
        swiper18,
        swiper17,
        swiper16,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>
`,js:`<script setup>
import { register } from 'swiper/element/bundle'
import swiper16 from '@images/banner/banner-16.jpg'
import swiper17 from '@images/banner/banner-17.jpg'
import swiper18 from '@images/banner/banner-18.jpg'
import swiper19 from '@images/banner/banner-19.jpg'
import swiper20 from '@images/banner/banner-20.jpg'

register()
<\/script>

<template>
  <swiper-container
    space-between="30"
    pagination="true"
    navigation="true"
    effect="fade"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper20,
        swiper19,
        swiper18,
        swiper17,
        swiper16,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>
`},yr={ts:`<script setup lang="ts">
import { register } from 'swiper/element/bundle'

import swiper11 from '@images/banner/banner-11.jpg'
import swiper12 from '@images/banner/banner-12.jpg'
import swiper13 from '@images/banner/banner-13.jpg'
import swiper15 from '@images/banner/banner-15.jpg'
import swiper16 from '@images/banner/banner-16.jpg'

register()
<\/script>

<template>
  <swiper-container
    class="mySwiper"
    thumbs-swiper=".mySwiper2"
    loop="true"
    space-between="10"
    navigation="true"
    centered-slides="true"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper11,
        swiper12,
        swiper13,
        swiper15,
        swiper16,
        swiper11,
        swiper12,
        swiper13,

      ]"
      :key="swiperImg"
    >
      <VImg
        :src="swiperImg"
        cover
      />
    </swiper-slide>
  </swiper-container>

  <swiper-container
    class="mySwiper2"
    loop="true"
    free-mode="true"
    events-prefix="swiper-"
    slides-per-view="4"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper11,
        swiper12,
        swiper13,
        swiper15,
        swiper16,
        swiper11,
        swiper12,
        swiper13,
      ]"
      :key="swiperImg"
    >
      <VImg
        :src="swiperImg"
        cover
      />
    </swiper-slide>
  </swiper-container>
</template>

<style lang="scss" scoped>
swiper-container {
  background-color: #000;
}

.mySwiper2 {
  swiper-slide {
    border: 5px solid black;
    block-size: 100%;
    inline-size: 25%;
    opacity: 0.4;
  }

  .swiper-slide-thumb-active {
    opacity: 1;
  }
}
</style>
`,js:`<script setup>
import { register } from 'swiper/element/bundle'
import swiper11 from '@images/banner/banner-11.jpg'
import swiper12 from '@images/banner/banner-12.jpg'
import swiper13 from '@images/banner/banner-13.jpg'
import swiper15 from '@images/banner/banner-15.jpg'
import swiper16 from '@images/banner/banner-16.jpg'

register()
<\/script>

<template>
  <swiper-container
    class="mySwiper"
    thumbs-swiper=".mySwiper2"
    loop="true"
    space-between="10"
    navigation="true"
    centered-slides="true"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper11,
        swiper12,
        swiper13,
        swiper15,
        swiper16,
        swiper11,
        swiper12,
        swiper13,

      ]"
      :key="swiperImg"
    >
      <VImg
        :src="swiperImg"
        cover
      />
    </swiper-slide>
  </swiper-container>

  <swiper-container
    class="mySwiper2"
    loop="true"
    free-mode="true"
    events-prefix="swiper-"
    slides-per-view="4"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper11,
        swiper12,
        swiper13,
        swiper15,
        swiper16,
        swiper11,
        swiper12,
        swiper13,
      ]"
      :key="swiperImg"
    >
      <VImg
        :src="swiperImg"
        cover
      />
    </swiper-slide>
  </swiper-container>
</template>

<style lang="scss" scoped>
swiper-container {
  background-color: #000;
}

.mySwiper2 {
  swiper-slide {
    border: 5px solid black;
    block-size: 100%;
    inline-size: 25%;
    opacity: 0.4;
  }

  .swiper-slide-thumb-active {
    opacity: 1;
  }
}
</style>
`},kr={ts:`<script setup lang="ts">
import { register } from 'swiper/element/bundle'
import swiper26 from '@images/banner/banner-26.jpg'
import swiper28 from '@images/banner/banner-28.jpg'
import swiper29 from '@images/banner/banner-29.jpg'
import swiper30 from '@images/banner/banner-30.jpg'
import swiper31 from '@images/banner/banner-31.jpg'
import swiper32 from '@images/banner/banner-32.jpg'
import swiper33 from '@images/banner/banner-33.jpg'
import swiper34 from '@images/banner/banner-34.jpg'
import swiper35 from '@images/banner/banner-35.jpg'
import swiper39 from '@images/banner/banner-39.jpg'

register()
<\/script>

<template>
  <swiper-container
    slides-per-view="4"
    grid-fill="rows"
    space-between="30"
    grid-rows="2"
    pagination-clickable="true"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper26,
        swiper39,
        swiper28,
        swiper29,
        swiper30,
        swiper31,
        swiper32,
        swiper33,
        swiper34,
        swiper35,
        swiper26,
        swiper39,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>
`,js:`<script setup>
import { register } from 'swiper/element/bundle'
import swiper26 from '@images/banner/banner-26.jpg'
import swiper28 from '@images/banner/banner-28.jpg'
import swiper29 from '@images/banner/banner-29.jpg'
import swiper30 from '@images/banner/banner-30.jpg'
import swiper31 from '@images/banner/banner-31.jpg'
import swiper32 from '@images/banner/banner-32.jpg'
import swiper33 from '@images/banner/banner-33.jpg'
import swiper34 from '@images/banner/banner-34.jpg'
import swiper35 from '@images/banner/banner-35.jpg'
import swiper39 from '@images/banner/banner-39.jpg'

register()
<\/script>

<template>
  <swiper-container
    slides-per-view="4"
    grid-fill="rows"
    space-between="30"
    grid-rows="2"
    pagination-clickable="true"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper26,
        swiper39,
        swiper28,
        swiper29,
        swiper30,
        swiper31,
        swiper32,
        swiper33,
        swiper34,
        swiper35,
        swiper26,
        swiper39,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>
`},Sr={ts:`<script setup lang="ts">
import { register } from 'swiper/element/bundle'
import swiper20 from '@images/banner/banner-20.jpg'
import swiper4 from '@images/banner/banner-4.jpg'
import swiper5 from '@images/banner/banner-5.jpg'
import swiper7 from '@images/banner/banner-7.jpg'
import swiper8 from '@images/banner/banner-8.jpg'
import swiper9 from '@images/banner/banner-9.jpg'

register()
<\/script>

<template>
  <swiper-container
    pagination-clickable="true"
    autoplay="true"
    navigation="true"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper4,
        swiper5,
        swiper9,
        swiper7,
        swiper8,
        swiper20,
      ]"
      :key="swiperImg"
      lazy="true"
    >
      <VImg
        :src="swiperImg"
        cover
        loading="lazy"
      />
    </swiper-slide>
  </swiper-container>
</template>
`,js:`<script setup>
import { register } from 'swiper/element/bundle'
import swiper20 from '@images/banner/banner-20.jpg'
import swiper4 from '@images/banner/banner-4.jpg'
import swiper5 from '@images/banner/banner-5.jpg'
import swiper7 from '@images/banner/banner-7.jpg'
import swiper8 from '@images/banner/banner-8.jpg'
import swiper9 from '@images/banner/banner-9.jpg'

register()
<\/script>

<template>
  <swiper-container
    pagination-clickable="true"
    autoplay="true"
    navigation="true"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper4,
        swiper5,
        swiper9,
        swiper7,
        swiper8,
        swiper20,
      ]"
      :key="swiperImg"
      lazy="true"
    >
      <VImg
        :src="swiperImg"
        cover
        loading="lazy"
      />
    </swiper-slide>
  </swiper-container>
</template>
`},Vr={ts:`<script setup lang="ts">
import { register } from 'swiper/element/bundle'
import swiper31 from '@images/banner/banner-31.jpg'
import swiper32 from '@images/banner/banner-32.jpg'
import swiper33 from '@images/banner/banner-33.jpg'
import swiper34 from '@images/banner/banner-34.jpg'
import swiper35 from '@images/banner/banner-35.jpg'

register()
<\/script>

<template>
  <swiper-container
    pagination="true"
    slides-per-view="3"
    space-between="25"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper31,
        swiper32,
        swiper33,
        swiper34,
        swiper35,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>
`,js:`<script setup>
import { register } from 'swiper/element/bundle'
import swiper31 from '@images/banner/banner-31.jpg'
import swiper32 from '@images/banner/banner-32.jpg'
import swiper33 from '@images/banner/banner-33.jpg'
import swiper34 from '@images/banner/banner-34.jpg'
import swiper35 from '@images/banner/banner-35.jpg'

register()
<\/script>

<template>
  <swiper-container
    pagination="true"
    slides-per-view="3"
    space-between="25"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper31,
        swiper32,
        swiper33,
        swiper34,
        swiper35,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>
`},Ir={ts:`<script setup lang="ts">
import { register } from 'swiper/element/bundle'

import swiper14 from '@images/banner/banner-14.jpg'
import swiper2 from '@images/banner/banner-2.jpg'
import swiper3 from '@images/banner/banner-3.jpg'
import swiper4 from '@images/banner/banner-4.jpg'
import swiper7 from '@images/banner/banner-7.jpg'

register()
<\/script>

<template>
  <swiper-container
    navigation="true"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper7,
        swiper4,
        swiper14,
        swiper3,
        swiper2,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>
`,js:`<script setup>
import { register } from 'swiper/element/bundle'
import swiper14 from '@images/banner/banner-14.jpg'
import swiper2 from '@images/banner/banner-2.jpg'
import swiper3 from '@images/banner/banner-3.jpg'
import swiper4 from '@images/banner/banner-4.jpg'
import swiper7 from '@images/banner/banner-7.jpg'

register()
<\/script>

<template>
  <swiper-container
    navigation="true"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper7,
        swiper4,
        swiper14,
        swiper3,
        swiper2,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>
`},hr={ts:`<script setup lang="ts">
import { register } from 'swiper/element/bundle'
import swiper8 from '@images/banner/banner-8.jpg'
import swiper9 from '@images/banner/banner-9.jpg'

import swiper12 from '@images/banner/banner-12.jpg'
import swiper20 from '@images/banner/banner-20.jpg'
import swiper7 from '@images/banner/banner-7.jpg'

register()
<\/script>

<template>
  <swiper-container
    pagination="true"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper12,
        swiper9,
        swiper8,
        swiper7,
        swiper20,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>
`,js:`<script setup>
import { register } from 'swiper/element/bundle'
import swiper8 from '@images/banner/banner-8.jpg'
import swiper9 from '@images/banner/banner-9.jpg'
import swiper12 from '@images/banner/banner-12.jpg'
import swiper20 from '@images/banner/banner-20.jpg'
import swiper7 from '@images/banner/banner-7.jpg'

register()
<\/script>

<template>
  <swiper-container
    pagination="true"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper12,
        swiper9,
        swiper8,
        swiper7,
        swiper20,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>
`},Br={ts:`<script setup lang="ts">
import { register } from 'swiper/element/bundle'
import swiper5 from '@images/banner/banner-5.jpg'
import swiper8 from '@images/banner/banner-8.jpg'

import swiper20 from '@images/banner/banner-20.jpg'
import swiper4 from '@images/banner/banner-4.jpg'
import swiper7 from '@images/banner/banner-7.jpg'

register()
<\/script>

<template>
  <swiper-container
    navigation="true"
    pagination-type="progressbar"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper8,
        swiper7,
        swiper20,
        swiper4,
        swiper5,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>
`,js:`<script setup>
import { register } from 'swiper/element/bundle'
import swiper5 from '@images/banner/banner-5.jpg'
import swiper8 from '@images/banner/banner-8.jpg'
import swiper20 from '@images/banner/banner-20.jpg'
import swiper4 from '@images/banner/banner-4.jpg'
import swiper7 from '@images/banner/banner-7.jpg'

register()
<\/script>

<template>
  <swiper-container
    navigation="true"
    pagination-type="progressbar"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper8,
        swiper7,
        swiper20,
        swiper4,
        swiper5,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>
`},Pr={ts:`<script setup lang="ts">
import { register } from 'swiper/element/bundle'
import swiper31 from '@images/banner/banner-31.jpg'
import swiper32 from '@images/banner/banner-32.jpg'
import swiper33 from '@images/banner/banner-33.jpg'
import swiper34 from '@images/banner/banner-34.jpg'
import swiper35 from '@images/banner/banner-35.jpg'
import swiper36 from '@images/banner/banner-36.jpg'
import swiper37 from '@images/banner/banner-37.jpg'
import swiper38 from '@images/banner/banner-38.jpg'
import swiper39 from '@images/banner/banner-39.jpg'

register()
<\/script>

<template>
  <swiper-container
    pagination-clickable="true"
    slides-per-view="5"
    space-between="50"
    events-prefix="swiper-"
    :breakpoints="{
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    }"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper31,
        swiper32,
        swiper33,
        swiper34,
        swiper35,
        swiper36,
        swiper37,
        swiper38,
        swiper39,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>
`,js:`<script setup>
import { register } from 'swiper/element/bundle'
import swiper31 from '@images/banner/banner-31.jpg'
import swiper32 from '@images/banner/banner-32.jpg'
import swiper33 from '@images/banner/banner-33.jpg'
import swiper34 from '@images/banner/banner-34.jpg'
import swiper35 from '@images/banner/banner-35.jpg'
import swiper36 from '@images/banner/banner-36.jpg'
import swiper37 from '@images/banner/banner-37.jpg'
import swiper38 from '@images/banner/banner-38.jpg'
import swiper39 from '@images/banner/banner-39.jpg'

register()
<\/script>

<template>
  <swiper-container
    pagination-clickable="true"
    slides-per-view="5"
    space-between="50"
    events-prefix="swiper-"
    :breakpoints="{
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    }"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper31,
        swiper32,
        swiper33,
        swiper34,
        swiper35,
        swiper36,
        swiper37,
        swiper38,
        swiper39,
      ]"
      :key="swiperImg"
    >
      <VImg :src="swiperImg" />
    </swiper-slide>
  </swiper-container>
</template>
`},$r={ts:`<script setup lang="ts">
import { register } from 'swiper/element/bundle'

register()

const slides = Array.from({ length: 500 }, (_, index) => \`Slides \${index + 1}\`)
const swiperEl = ref<any>(null)
const prependNumber = ref(1)
const appendNumber = ref(500)

const toSlide = (index: number) => {
  swiperEl.value?.swiper.slideTo(index - 1)
}

const prependSlide = () => {
  swiperEl.value?.swiper.prependSlide([
    \`<swiper-slide>Slide \${(--prependNumber.value)} </swiper-slide>\`,
    \`<swiper-slide>Slide \${(--prependNumber.value)} </swiper-slide>\`,
  ])
}

const appendSlide = () => {
  swiperEl.value?.swiper.appendSlide([
    \`<swiper-slide>Slide \${(++appendNumber.value)} </swiper-slide>\`,
  ])
}
<\/script>

<template>
  <section class="swiper-virtual">
    <swiper-container
      ref="swiperEl"
      virtual="true"
      :slides="slides"
      navigation="true"
      slides-per-view="5"
      space-between="50"
      free-mode="true"
      events-prefix="swiper-"
      :breakpoints="{
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      }"
    >
      <swiper-slide
        v-for="(item, index) in slides"
        :key="index"
      >
        {{ item }}
      </swiper-slide>
    </swiper-container>

    <div class="d-flex justify-center gap-4 flex-wrap">
      <VBtn
        variant="outlined"
        color="primary"
        @click.prevent="prependSlide"
      >
        Prepend 2 Slides
      </VBtn>
      <VBtn
        variant="outlined"
        color="primary"
        @click.prevent="toSlide(1)"
      >
        Slide 1
      </VBtn>
      <VBtn
        variant="outlined"
        color="primary"
        @click.prevent="toSlide(250)"
      >
        Slide 250
      </VBtn>
      <VBtn
        variant="outlined"
        color="primary"
        @click.prevent="toSlide(500)"
      >
        Slide 500
      </VBtn>
      <VBtn
        variant="outlined"
        color="primary"
        @click.prevent="appendSlide"
      >
        Append Slide
      </VBtn>
    </div>
  </section>
</template>

<style lang="scss">
.swiper-virtual {
  swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    font-size: 18px;
    text-align: center;
  }

  swiper-container {
    block-size: 300px;
    inline-size: 100%;
    margin-block: 20px;
    margin-inline: auto;
  }
}
</style>
`,js:`<script setup>
import { register } from 'swiper/element/bundle'

register()

const slides = Array.from({ length: 500 }, (_, index) => \`Slides \${ index + 1 }\`)
const swiperEl = ref(null)
const prependNumber = ref(1)
const appendNumber = ref(500)

const toSlide = index => {
  swiperEl.value?.swiper.slideTo(index - 1)
}

const prependSlide = () => {
  swiperEl.value?.swiper.prependSlide([
    \`<swiper-slide>Slide \${ --prependNumber.value } </swiper-slide>\`,
    \`<swiper-slide>Slide \${ --prependNumber.value } </swiper-slide>\`,
  ])
}

const appendSlide = () => {
  swiperEl.value?.swiper.appendSlide([\`<swiper-slide>Slide \${ ++appendNumber.value } </swiper-slide>\`])
}
<\/script>

<template>
  <section class="swiper-virtual">
    <swiper-container
      ref="swiperEl"
      virtual="true"
      :slides="slides"
      navigation="true"
      slides-per-view="5"
      space-between="50"
      free-mode="true"
      events-prefix="swiper-"
      :breakpoints="{
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      }"
    >
      <swiper-slide
        v-for="(item, index) in slides"
        :key="index"
      >
        {{ item }}
      </swiper-slide>
    </swiper-container>

    <div class="d-flex justify-center gap-4 flex-wrap">
      <VBtn
        variant="outlined"
        color="primary"
        @click.prevent="prependSlide"
      >
        Prepend 2 Slides
      </VBtn>
      <VBtn
        variant="outlined"
        color="primary"
        @click.prevent="toSlide(1)"
      >
        Slide 1
      </VBtn>
      <VBtn
        variant="outlined"
        color="primary"
        @click.prevent="toSlide(250)"
      >
        Slide 250
      </VBtn>
      <VBtn
        variant="outlined"
        color="primary"
        @click.prevent="toSlide(500)"
      >
        Slide 500
      </VBtn>
      <VBtn
        variant="outlined"
        color="primary"
        @click.prevent="appendSlide"
      >
        Append Slide
      </VBtn>
    </div>
  </section>
</template>

<style lang="scss">
.swiper-virtual {
  swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    font-size: 18px;
    text-align: center;
  }

  swiper-container {
    block-size: 300px;
    inline-size: 100%;
    margin-block: 20px;
    margin-inline: auto;
  }
}
</style>
`};const Lr={__name:"swiper",setup(c){return(l,o)=>{const i=gr,p=le,j=mr,T=ar,A=tr,u=sr,a=rr,_=We,O=Me,ee=Oe,re=Ge,ie=Be,se=Ve,ne=ye,te=_e,pe=ue,ae=ge;return s(),oe(we,null,{default:t(()=>[r(d,null,{default:t(()=>[r(p,{title:"Basic",code:ur},{default:t(()=>[r(i)]),_:1},8,["code"])]),_:1}),r(d,null,{default:t(()=>[r(p,{title:"Navigation",code:Ir},{default:t(()=>[r(j)]),_:1},8,["code"])]),_:1}),r(d,null,{default:t(()=>[r(p,{title:"Pagination",code:hr},{default:t(()=>[r(T)]),_:1},8,["code"])]),_:1}),r(d,null,{default:t(()=>[r(p,{title:"Progress",code:Br},{default:t(()=>[r(A)]),_:1},8,["code"])]),_:1}),r(d,null,{default:t(()=>[r(p,{title:"Multiple Slides Per View",code:Vr},{default:t(()=>[r(u)]),_:1},8,["code"])]),_:1}),r(d,null,{default:t(()=>[r(p,{title:"Grid",code:kr},{default:t(()=>[r(a)]),_:1},8,["code"])]),_:1}),r(d,null,{default:t(()=>[r(p,{variant:"text",title:"Centered Slides Option 1",code:fr},{default:t(()=>[r(_)]),_:1},8,["code"])]),_:1}),r(d,null,{default:t(()=>[r(p,{title:"Centered Slides Option 2",code:_r},{default:t(()=>[r(O)]),_:1},8,["code"])]),_:1}),r(d,null,{default:t(()=>[r(p,{title:"Fade",code:xr},{default:t(()=>[r(ee)]),_:1},8,["code"])]),_:1}),r(d,null,{default:t(()=>[r(p,{title:"Cube Effect",code:jr},{default:t(()=>[r(re)]),_:1},8,["code"])]),_:1}),r(d,null,{default:t(()=>[r(p,{title:"Coverflow Effect",code:vr},{default:t(()=>[r(ie)]),_:1},8,["code"])]),_:1}),r(d,null,{default:t(()=>[r(p,{title:"Autoplay",code:br},{default:t(()=>[r(se)]),_:1},8,["code"])]),_:1}),r(d,null,{default:t(()=>[r(p,{title:"Gallery",code:yr},{default:t(()=>[r(ne)]),_:1},8,["code"])]),_:1}),r(d,null,{default:t(()=>[r(p,{title:"Lazy Loading",code:Sr},{default:t(()=>[r(te)]),_:1},8,["code"])]),_:1}),r(d,null,{default:t(()=>[r(p,{title:"Responsive Breakpoints",code:Pr},{default:t(()=>[r(pe)]),_:1},8,["code"])]),_:1}),r(d,null,{default:t(()=>[r(p,{title:"Virtual Slides",code:$r},{default:t(()=>[r(ae)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{Lr as default};
