import{u as g,S as m,P as f,U as k,E as b}from"./index-498faf30.js";import{T as v,_ as C}from"./TiptapEditor-242634c0.js";import{V as n}from"./VChip-d9455d32.js";import{V as y}from"./VDivider-898e64ba.js";import{o as d,c,n as o,b as t,e as r,v as a,z as V,r as x,aU as A,f as B}from"./main-04a50ca6.js";import{_ as w}from"./AppCardCode-f0383458.js";import{V as E,a as h}from"./VRow-318207f7.js";import"./VAvatar-8d758b13.js";import"./VImg-3709ff10.js";import"./VCard-bf6c9c32.js";import"./VCardText-ed82c887.js";const H={class:"border pa-2 rounded"},$={key:0,class:"d-flex flex-wrap gap-x-4 gap-y-2 mb-2"},I={__name:"DemoEditorCustomEditor",setup(p){const i=g({content:`
        <h2>
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you'd probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That's a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn't that great? And all of that is editable. But wait, there's more. Let's try a code block:
        </p>
        <pre><code class="language-css">body {
  display: none;
}</code></pre>
        <p>
          I know, I know, this is impressive. It's only the tip of the iceberg though. Give it a try and click a little bit around. Don't forget to check the other examples too.
        </p>
        <blockquote>
          Wow, that's amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
      `,extensions:[m,v.configure({types:["heading","paragraph"]}),f.configure({placeholder:"Write something here..."}),k]});return(u,e)=>(d(),c("div",H,[o(i)?(d(),c("div",$,[t(n,{disabled:!o(i).can().chain().focus().toggleBold().run(),color:o(i).isActive("bold")?"primary":"",onClick:e[0]||(e[0]=l=>o(i).chain().focus().toggleBold().run())},{default:r(()=>e[21]||(e[21]=[a(" bold ")])),_:1},8,["disabled","color"]),t(n,{disabled:!o(i).can().chain().focus().toggleItalic().run(),color:o(i).isActive("italic")?"primary":"",onClick:e[1]||(e[1]=l=>o(i).chain().focus().toggleItalic().run())},{default:r(()=>e[22]||(e[22]=[a(" italic ")])),_:1},8,["disabled","color"]),t(n,{disabled:!o(i).can().chain().focus().toggleStrike().run(),color:o(i).isActive("strike")?"primary":"",onClick:e[2]||(e[2]=l=>o(i).chain().focus().toggleStrike().run())},{default:r(()=>e[23]||(e[23]=[a(" strike ")])),_:1},8,["disabled","color"]),t(n,{disabled:!o(i).can().chain().focus().toggleCode().run(),color:o(i).isActive("code")?"primary":"",onClick:e[3]||(e[3]=l=>o(i).chain().focus().toggleCode().run())},{default:r(()=>e[24]||(e[24]=[a(" code ")])),_:1},8,["disabled","color"]),t(n,{onClick:e[4]||(e[4]=l=>o(i).chain().focus().unsetAllMarks().run())},{default:r(()=>e[25]||(e[25]=[a(" clear marks ")])),_:1}),t(n,{onClick:e[5]||(e[5]=l=>o(i).chain().focus().clearNodes().run())},{default:r(()=>e[26]||(e[26]=[a(" clear nodes ")])),_:1}),t(n,{color:o(i).isActive("paragraph")?"primary":"",onClick:e[6]||(e[6]=l=>o(i).chain().focus().setParagraph().run())},{default:r(()=>e[27]||(e[27]=[a(" paragraph ")])),_:1},8,["color"]),t(n,{color:o(i).isActive("heading",{level:1})?"primary":"",onClick:e[7]||(e[7]=l=>o(i).chain().focus().toggleHeading({level:1}).run())},{default:r(()=>e[28]||(e[28]=[a(" h1 ")])),_:1},8,["color"]),t(n,{color:o(i).isActive("heading",{level:2})?"primary":"",onClick:e[8]||(e[8]=l=>o(i).chain().focus().toggleHeading({level:2}).run())},{default:r(()=>e[29]||(e[29]=[a(" h2 ")])),_:1},8,["color"]),t(n,{color:o(i).isActive("heading",{level:3})?"primary":"",onClick:e[9]||(e[9]=l=>o(i).chain().focus().toggleHeading({level:3}).run())},{default:r(()=>e[30]||(e[30]=[a(" h3 ")])),_:1},8,["color"]),t(n,{color:o(i).isActive("heading",{level:4})?"primary":"",onClick:e[10]||(e[10]=l=>o(i).chain().focus().toggleHeading({level:4}).run())},{default:r(()=>e[31]||(e[31]=[a(" h4 ")])),_:1},8,["color"]),t(n,{color:o(i).isActive("heading",{level:5})?"primary":"",onClick:e[11]||(e[11]=l=>o(i).chain().focus().toggleHeading({level:5}).run())},{default:r(()=>e[32]||(e[32]=[a(" h5 ")])),_:1},8,["color"]),t(n,{color:o(i).isActive("heading",{level:6})?"primary":"",onClick:e[12]||(e[12]=l=>o(i).chain().focus().toggleHeading({level:6}).run())},{default:r(()=>e[33]||(e[33]=[a(" h6 ")])),_:1},8,["color"]),t(n,{color:o(i).isActive("bulletList")?"primary":"",onClick:e[13]||(e[13]=l=>o(i).chain().focus().toggleBulletList().run())},{default:r(()=>e[34]||(e[34]=[a(" bullet list ")])),_:1},8,["color"]),t(n,{color:o(i).isActive("orderedList")?"primary":"",onClick:e[14]||(e[14]=l=>o(i).chain().focus().toggleOrderedList().run())},{default:r(()=>e[35]||(e[35]=[a(" ordered list ")])),_:1},8,["color"]),t(n,{color:o(i).isActive("codeBlock")?"primary":"",onClick:e[15]||(e[15]=l=>o(i).chain().focus().toggleCodeBlock().run())},{default:r(()=>e[36]||(e[36]=[a(" code block ")])),_:1},8,["color"]),t(n,{color:o(i).isActive("blockquote")?"primary":"",onClick:e[16]||(e[16]=l=>o(i).chain().focus().toggleBlockquote().run())},{default:r(()=>e[37]||(e[37]=[a(" blockquote ")])),_:1},8,["color"]),t(n,{onClick:e[17]||(e[17]=l=>o(i).chain().focus().setHorizontalRule().run())},{default:r(()=>e[38]||(e[38]=[a(" horizontal rule ")])),_:1}),t(n,{onClick:e[18]||(e[18]=l=>o(i).chain().focus().setHardBreak().run())},{default:r(()=>e[39]||(e[39]=[a(" hard break ")])),_:1}),t(n,{disabled:!o(i).can().chain().focus().undo().run(),onClick:e[19]||(e[19]=l=>o(i).chain().focus().undo().run())},{default:r(()=>e[40]||(e[40]=[a(" undo ")])),_:1},8,["disabled"]),t(n,{disabled:!o(i).can().chain().focus().redo().run(),onClick:e[20]||(e[20]=l=>o(i).chain().focus().redo().run())},{default:r(()=>e[41]||(e[41]=[a(" redo ")])),_:1},8,["disabled"])])):V("",!0),t(y,{class:"my-4"}),t(o(b),{editor:o(i)},null,8,["editor"])]))}};const T={__name:"DemoEditorBasicEditor",setup(p){const i=x(`
<p>
  This is a radically reduced version of tiptap. It has support for a document, with paragraphs and text. That's it. It's probably too much for real minimalists though.
</p>
<p>
  The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.  
</p>
`);return(u,e)=>{const l=C;return d(),c("div",null,[t(l,{modelValue:o(i),"onUpdate:modelValue":e[0]||(e[0]=s=>A(i)?i.value=s:null),class:"border rounded"},null,8,["modelValue"])])}}},q={ts:`<script setup lang="ts">
const basicEditorContent = ref(\`
<p>
  This is a radically reduced version of tiptap. It has support for a document, with paragraphs and text. That's it. It's probably too much for real minimalists though.
</p>
<p>
  The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.  
</p>
\`)
<\/script>

<template>
  <div>
    <TiptapEditor
      v-model="basicEditorContent"
      class="border rounded"
    />
  </div>
</template>

<style lang="scss">
.ProseMirror {
  block-size: 200px;
  outline: none;
  overflow-y: auto;
  padding-inline: 0.5rem;
}
</style>
`,js:`<script setup>
const basicEditorContent = ref(\`
<p>
  This is a radically reduced version of tiptap. It has support for a document, with paragraphs and text. That's it. It's probably too much for real minimalists though.
</p>
<p>
  The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.  
</p>
\`)
<\/script>

<template>
  <div>
    <TiptapEditor
      v-model="basicEditorContent"
      class="border rounded"
    />
  </div>
</template>

<style lang="scss">
.ProseMirror {
  block-size: 200px;
  outline: none;
  overflow-y: auto;
  padding-inline: 0.5rem;
}
</style>
`},z={ts:`<script setup lang="ts">
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline } from '@tiptap/extension-underline'
import { StarterKit } from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'

const editor = useEditor({
  content: \`
        <h2>
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you'd probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That's a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn't that great? And all of that is editable. But wait, there's more. Let's try a code block:
        </p>
        <pre><code class="language-css">body {
  display: none;
}</code></pre>
        <p>
          I know, I know, this is impressive. It's only the tip of the iceberg though. Give it a try and click a little bit around. Don't forget to check the other examples too.
        </p>
        <blockquote>
          Wow, that's amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
      \`,
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Placeholder.configure({
      placeholder: 'Write something here...',
    }),
    Underline,
  ],
})
<\/script>

<template>
  <div class="border pa-2 rounded">
    <div
      v-if="editor"
      class="d-flex flex-wrap gap-x-4 gap-y-2 mb-2"
    >
      <VChip
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :color="editor.isActive('bold') ? 'primary' : ''"
        @click="editor.chain().focus().toggleBold().run()"
      >
        bold
      </VChip>

      <VChip
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :color="editor.isActive('italic') ? 'primary' : ''"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        italic
      </VChip>

      <VChip
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :color="editor.isActive('strike') ? 'primary' : ''"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        strike
      </VChip>

      <VChip
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :color="editor.isActive('code') ? 'primary' : ''"
        @click="editor.chain().focus().toggleCode().run()"
      >
        code
      </VChip>

      <VChip @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </VChip>

      <VChip @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </VChip>

      <VChip
        :color="editor.isActive('paragraph') ? 'primary' : ''"
        @click="editor.chain().focus().setParagraph().run()"
      >
        paragraph
      </VChip>

      <VChip
        :color="editor.isActive('heading', { level: 1 }) ? 'primary' : ''"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        h1
      </VChip>

      <VChip
        :color="editor.isActive('heading', { level: 2 }) ? 'primary' : ''"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        h2
      </VChip>

      <VChip
        :color="editor.isActive('heading', { level: 3 }) ? 'primary' : ''"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        h3
      </VChip>

      <VChip
        :color="editor.isActive('heading', { level: 4 }) ? 'primary' : ''"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      >
        h4
      </VChip>

      <VChip
        :color="editor.isActive('heading', { level: 5 }) ? 'primary' : ''"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      >
        h5
      </VChip>

      <VChip
        :color="editor.isActive('heading', { level: 6 }) ? 'primary' : ''"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      >
        h6
      </VChip>

      <VChip
        :color="editor.isActive('bulletList') ? 'primary' : ''"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        bullet list
      </VChip>

      <VChip
        :color="editor.isActive('orderedList') ? 'primary' : ''"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        ordered list
      </VChip>

      <VChip
        :color="editor.isActive('codeBlock') ? 'primary' : ''"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        code block
      </VChip>

      <VChip
        :color="editor.isActive('blockquote') ? 'primary' : ''"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        blockquote
      </VChip>

      <VChip @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </VChip>

      <VChip @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </VChip>

      <VChip
        :disabled="!editor.can().chain().focus().undo().run()"
        @click="editor.chain().focus().undo().run()"
      >
        undo
      </VChip>

      <VChip
        :disabled="!editor.can().chain().focus().redo().run()"
        @click="editor.chain().focus().redo().run()"
      >
        redo
      </VChip>
    </div>
    <VDivider class="my-4" />
    <EditorContent :editor="editor" />
  </div>
</template>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-block-start: 0.75em;
  }

  outline: none;
  overflow-y: auto;
  padding-inline: 0.5rem;

  ul,
  ol {
    padding-block: 0;
    padding-inline: 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    border-radius: 0.5rem;
    background: #0d0d0d;
    color: #fff;
    font-family: JetBrainsMono, monospace;
    padding-block: 0.75rem;
    padding-inline: 1rem;

    code {
      padding: 0;
      background: none;
      color: inherit;
      font-size: 0.8rem;
    }
  }

  img {
    block-size: auto;
    max-inline-size: 100%;
  }

  blockquote {
    border-inline-start: 2px solid rgba(#0d0d0d, 0.1);
    padding-inline-start: 1rem;
  }

  hr {
    border: none;
    border-block-start: 2px solid rgba(#0d0d0d, 0.1);
    margin-block: 2rem;
    margin-inline: 0;
  }
}
</style>
`,js:`<script setup>
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline } from '@tiptap/extension-underline'
import { StarterKit } from '@tiptap/starter-kit'
import {
  EditorContent,
  useEditor,
} from '@tiptap/vue-3'

const editor = useEditor({
  content: \`
        <h2>
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you'd probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That's a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn't that great? And all of that is editable. But wait, there's more. Let's try a code block:
        </p>
        <pre><code class="language-css">body {
  display: none;
}</code></pre>
        <p>
          I know, I know, this is impressive. It's only the tip of the iceberg though. Give it a try and click a little bit around. Don't forget to check the other examples too.
        </p>
        <blockquote>
          Wow, that's amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
      \`,
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: [
        'heading',
        'paragraph',
      ],
    }),
    Placeholder.configure({ placeholder: 'Write something here...' }),
    Underline,
  ],
})
<\/script>

<template>
  <div class="border pa-2 rounded">
    <div
      v-if="editor"
      class="d-flex flex-wrap gap-x-4 gap-y-2 mb-2"
    >
      <VChip
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :color="editor.isActive('bold') ? 'primary' : ''"
        @click="editor.chain().focus().toggleBold().run()"
      >
        bold
      </VChip>

      <VChip
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :color="editor.isActive('italic') ? 'primary' : ''"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        italic
      </VChip>

      <VChip
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :color="editor.isActive('strike') ? 'primary' : ''"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        strike
      </VChip>

      <VChip
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :color="editor.isActive('code') ? 'primary' : ''"
        @click="editor.chain().focus().toggleCode().run()"
      >
        code
      </VChip>

      <VChip @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </VChip>

      <VChip @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </VChip>

      <VChip
        :color="editor.isActive('paragraph') ? 'primary' : ''"
        @click="editor.chain().focus().setParagraph().run()"
      >
        paragraph
      </VChip>

      <VChip
        :color="editor.isActive('heading', { level: 1 }) ? 'primary' : ''"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        h1
      </VChip>

      <VChip
        :color="editor.isActive('heading', { level: 2 }) ? 'primary' : ''"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        h2
      </VChip>

      <VChip
        :color="editor.isActive('heading', { level: 3 }) ? 'primary' : ''"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        h3
      </VChip>

      <VChip
        :color="editor.isActive('heading', { level: 4 }) ? 'primary' : ''"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      >
        h4
      </VChip>

      <VChip
        :color="editor.isActive('heading', { level: 5 }) ? 'primary' : ''"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      >
        h5
      </VChip>

      <VChip
        :color="editor.isActive('heading', { level: 6 }) ? 'primary' : ''"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      >
        h6
      </VChip>

      <VChip
        :color="editor.isActive('bulletList') ? 'primary' : ''"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        bullet list
      </VChip>

      <VChip
        :color="editor.isActive('orderedList') ? 'primary' : ''"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        ordered list
      </VChip>

      <VChip
        :color="editor.isActive('codeBlock') ? 'primary' : ''"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        code block
      </VChip>

      <VChip
        :color="editor.isActive('blockquote') ? 'primary' : ''"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        blockquote
      </VChip>

      <VChip @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </VChip>

      <VChip @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </VChip>

      <VChip
        :disabled="!editor.can().chain().focus().undo().run()"
        @click="editor.chain().focus().undo().run()"
      >
        undo
      </VChip>

      <VChip
        :disabled="!editor.can().chain().focus().redo().run()"
        @click="editor.chain().focus().redo().run()"
      >
        redo
      </VChip>
    </div>
    <VDivider class="my-4" />
    <EditorContent :editor="editor" />
  </div>
</template>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-block-start: 0.75em;
  }

  outline: none;
  overflow-y: auto;
  padding-inline: 0.5rem;

  ul,
  ol {
    padding-block: 0;
    padding-inline: 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    border-radius: 0.5rem;
    background: #0d0d0d;
    color: #fff;
    font-family: JetBrainsMono, monospace;
    padding-block: 0.75rem;
    padding-inline: 1rem;

    code {
      padding: 0;
      background: none;
      color: inherit;
      font-size: 0.8rem;
    }
  }

  img {
    block-size: auto;
    max-inline-size: 100%;
  }

  blockquote {
    border-inline-start: 2px solid rgba(#0d0d0d, 0.1);
    padding-inline-start: 1rem;
  }

  hr {
    border: none;
    border-block-start: 2px solid rgba(#0d0d0d, 0.1);
    margin-block: 2rem;
    margin-inline: 0;
  }
}
</style>
`},O={__name:"editors",setup(p){return(i,u)=>{const e=T,l=w,s=I;return d(),B(E,null,{default:r(()=>[t(h,{cols:"12"},{default:r(()=>[t(l,{title:"Basic Editor",code:q},{default:r(()=>[t(e)]),_:1},8,["code"])]),_:1}),t(h,{cols:"12"},{default:r(()=>[t(l,{title:"Custom Editor",code:z},{default:r(()=>[t(s)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{O as default};
