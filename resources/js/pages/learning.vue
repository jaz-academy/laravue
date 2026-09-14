<script setup>
import Footer from '@/views/front/front-page-footer.vue'
import Navbar from '@/views/front/front-page-navbar.vue'
import { ref } from 'vue'

definePage({ meta: { layout: 'blank' } })

const activeSectionId = ref(null)

const foundations = [
  { title: "Al-Qur'an & Islamic Studies", icon: 'tabler-book-2', desc: 'Membaca, menghafal, dan tadabbur Al-Qur\'an serta tsaqafah Islam.' },
  { title: 'Bahasa', icon: 'tabler-message-language', desc: 'Indonesia & Inggris untuk komunikasi, literasi, dan public speaking.' },
  { title: 'Mathematics', icon: 'tabler-math', desc: 'Numerasi, logika, analisis data, statistik, dan pemecahan masalah.' },
  { title: 'Science & Society', icon: 'tabler-globe', desc: 'Memahami alam, manusia, melalui pendekatan World Studies.' },
  { title: 'Technology & Digital', icon: 'tabler-device-laptop', desc: 'Literasi digital, coding, desain multimedia, dan AI.' },
]

const metaskills = [
  { title: 'Learning to Learn', icon: 'tabler-brain', desc: 'Mampu menentukan apa yang dipelajari, mencari sumber, dan mengevaluasi hasil secara mandiri.' },
  { title: 'Critical Thinking', icon: 'tabler-zoom-question', desc: 'Terbiasa mempertanyakan fakta, bukti, sumber, dan mempertimbangkan perspektif yang berbeda.' },
  { title: 'Problem Solving', icon: 'tabler-puzzle', desc: 'Mampu mendefinisikan masalah, mencari alternatif, menguji solusi, dan memperbaikinya.' },
  { title: 'Creativity', icon: 'tabler-bulb', desc: 'Mampu menghasilkan berbagai ide dan kemungkinan baru, bukan sekadar mengikuti contoh.' },
  { title: 'Communication', icon: 'tabler-messages', desc: 'Terampil menjelaskan ide, menulis, berpresentasi, berdiskusi, serta menjadi pendengar yang baik.' },
  { title: 'Collaboration', icon: 'tabler-users', desc: 'Belajar membagi peran, memberi feedback, menyelesaikan konflik, dan bekerjasama dalam tim.' },
  { title: 'Self Management', icon: 'tabler-calendar-time', desc: 'Mampu mengatur waktu, menentukan prioritas, menyelesaikan tugas, dan menghadapi kegagalan.' },
  { title: 'Adaptability', icon: 'tabler-refresh', desc: 'Terbiasa dan tangguh dalam menghadapi perubahan serta kemauan kuat mempelajari hal-hal baru.' },
]

const projectCycles = [
  { title: 'Explore', desc: 'Memahami masalah dan membangun rasa ingin tahu.' },
  { title: 'Question', desc: 'Menyusun pertanyaan yang ingin dijawab.' },
  { title: 'Learn', desc: 'Mempelajari pengetahuan yang diperlukan.' },
  { title: 'Investigate', desc: 'Observasi, wawancara, eksperimen dan pengumpulan data.' },
  { title: 'Create', desc: 'Membuat solusi atau produk.' },
  { title: 'Test', desc: 'Menguji dan mendapatkan feedback.' },
  { title: 'Improve', desc: 'Memperbaiki solusi.' },
  { title: 'Share', desc: 'Presentasi kepada komunitas atau pihak luar.' },
  { title: 'Reflect', desc: 'Mengevaluasi apa yang dipelajari dan apa yang perlu dikembangkan.' },
]

const targets = [
  { title: 'Beriman', desc: 'Menjadikan nilai Islam sebagai dasar mengambil keputusan.' },
  { title: 'Pembelajar', desc: 'Mampu belajar tanpa selalu menunggu diajarkan.' },
  { title: 'Pemikir', desc: 'Mampu mempertanyakan, mencari bukti, menganalisis.' },
  { title: 'Problem Solver', desc: 'Mengubah masalah menjadi peluang untuk solusi.' },
  { title: 'Creator', desc: 'Mampu menghasilkan karya yang memberi dampak.' },
  { title: 'Communicator', desc: 'Mampu menyampaikan gagasan dan bekerja sama.' },
  { title: 'Digital Citizen', desc: 'Menggunakan teknologi dengan kritis dan beretika.' },
  { title: 'Contributor', desc: 'Mandiri dan mampu memberi manfaat bagi umat.' },
]
</script>

<template>
  <div class="landing-page-wrapper mt-16">
    <Navbar :active-id="activeSectionId" />
    
    <VContainer>
      <div class="learning-page">
        <div class="text-center mb-16 pt-10">
          <h1 class="text-h2 font-weight-bold mb-4 text-primary">
            Struktur Pembelajaran
          </h1>
          <p class="text-h5 text-high-emphasis">
            Pendekatan komprehensif yang menghubungkan agama, pengetahuan, teknologi, dan karya nyata.
          </p>
        </div>

        <!-- Struktur Kurikulum -->
        <h2 class="text-h3 font-weight-bold text-center mb-10 text-primary">
          3 Lapisan Kurikulum
        </h2>
        
        <!-- Lapisan 1: Fondasi -->
        <VCard
          class="mb-10 rounded-xl border"
          elevation="0"
        >
          <VCardTitle
            class="pa-6 text-h4 text-white"
            style="background-color: rgb(var(--v-theme-primary));"
          >
            1. Fondasi Pengetahuan
          </VCardTitle>
          <VCardText class="pa-8">
            <VRow>
              <VCol
                v-for="(item, i) in foundations"
                :key="i"
                cols="12"
                sm="6"
                md="4"
              >
                <div class="d-flex mb-4">
                  <VAvatar
                    color="primary"
                    variant="tonal"
                    class="me-4 mt-1"
                    size="50"
                  >
                    <VIcon
                      :icon="item.icon"
                      size="26"
                    />
                  </VAvatar>
                  <div>
                    <h4 class="text-h6 font-weight-bold text-high-emphasis text-primary mb-1">
                      {{ item.title }}
                    </h4>
                    <p
                      class="text-body-1 mb-0 text-high-emphasis"
                      style="line-height: 1.5;"
                    >
                      {{ item.desc }}
                    </p>
                  </div>
                </div>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>

        <!-- Lapisan 2: Metaskill -->
        <VCard
          class="mb-10 rounded-xl border"
          elevation="0"
        >
          <VCardTitle class="pa-6 text-h4 text-white bg-light-primary">
            2. Metaskills
          </VCardTitle>
          <VCardText class="pa-8">
            <p class="text-h6 mb-8 text-high-emphasis">
              Metaskill dikembangkan <strong>di seluruh kegiatan</strong>, bukan sebagai mata pelajaran terpisah.
            </p>
            <VRow>
              <VCol
                v-for="(skill, i) in metaskills"
                :key="i"
                cols="12"
                sm="6"
                md="3"
              >
                <VCard
                  class="pa-6 fill-height text-center rounded-lg bg-light-primary"
                  elevation="0"
                >
                  <VAvatar
                    color="primary"
                    variant="flat"
                    size="64"
                    class="mb-4"
                  >
                    <VIcon
                      :icon="skill.icon"
                      size="32"
                      color="white"
                    />
                  </VAvatar>
                  <h4 class="text-h6 font-weight-bold mb-3 text-high-emphasis text-primary">
                    {{ skill.title }}
                  </h4>
                  <p
                    class="text-body-1 mb-0 text-high-emphasis"
                    style="line-height: 1.5;"
                  >
                    {{ skill.desc }}
                  </p>
                </VCard>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>

        <!-- Lapisan 3: Project-Based Learning -->
        <VCard
          class="mb-16 rounded-xl border"
          elevation="0"
        >
          <VCardTitle
            class="pa-6 text-h4 text-white"
            style="background-color: rgb(var(--v-theme-info));"
          >
            3. Project-Based Learning
          </VCardTitle>
          <VCardText class="pa-8">
            <p
              class="text-h6 mb-4 text-high-emphasis"
              style="line-height: 1.6;"
            >
              Proyek menjadi <strong>pengikat seluruh pembelajaran</strong>. Dalam satu proyek, pelajaran inti digunakan untuk menyelesaikan masalah nyata.
            </p>
            
            <h4 class="text-h4 font-weight-bold mb-8 mt-10 text-high-emphasis">
              Siklus Proyek (6-8 Minggu)
            </h4>
            <VTimeline
              density="compact"
              align="start"
            >
              <VTimelineItem
                v-for="(cycle, i) in projectCycles"
                :key="i"
                dot-color="info"
                size="small"
              >
                <template #opposite>
                  <span class="text-caption font-weight-bold">{{ i + 1 }}</span>
                </template>
                <div class="mb-6">
                  <h5 class="text-h5 font-weight-bold text-high-emphasis mb-2">
                    {{ cycle.title }}
                  </h5>
                  <p class="text-h6 mb-0 text-high-emphasis font-weight-regular">
                    {{ cycle.desc }}
                  </p>
                </div>
              </VTimelineItem>
            </VTimeline>
          </VCardText>
        </VCard>

        <!-- Target Pembelajaran -->
        <div class="mb-16 text-center">
          <h2 class="text-h2 font-weight-bold mb-10 text-primary">
            Target Pembelajaran Akhir
          </h2>
          <p class="text-h5 mb-10 text-high-emphasis">
            Bukan hanya siap menghadapi masa depan, tetapi <strong>mampu ikut menciptakan masa depan.</strong>
          </p>
          <VRow>
            <VCol
              v-for="(target, i) in targets"
              :key="i"
              cols="12"
              sm="6"
              md="3"
            >
              <VCard
                class="pa-6 fill-height rounded-lg border text-center"
                elevation="0"
              >
                <h4 class="text-h5 font-weight-bold text-primary mb-4">
                  {{ target.title }}
                </h4>
                <p
                  class="text-body-1 mb-0 text-high-emphasis"
                  style="line-height: 1.5;"
                >
                  {{ target.desc }}
                </p>
              </VCard>
            </VCol>
          </VRow>
        </div>
      </div>
    </VContainer>

    <Footer />
  </div>
</template>

<style lang="scss">
.learning-page {
  padding-block: 1rem 5rem;
}

.bg-light-secondary {
  background-color: rgba(var(--v-theme-secondary), 0.05);
}

@media (min-width: 600px) {
  .landing-page-wrapper {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}
</style>
