<script setup>
import Footer from '@/views/front/front-page-footer.vue'
import Navbar from '@/views/front/front-page-navbar.vue'
import { ref } from 'vue'

definePage({ meta: { layout: 'blank' } })

const activeSectionId = ref(null)

const missions = [
  "Menjadikan Al-Qur'an dan nilai Islam sebagai fondasi kehidupan.",
  "Menumbuhkan kemampuan untuk belajar mandiri dan rasa ingin tahu.",
  "Mengembangkan kemampuan berpikir kritis, kreatif, dan problem solving.",
  "Menghubungkan pengetahuan dengan masalah nyata melalui proyek.",
  "Membekali anak dengan bahasa, matematika, sains, sosial, dan teknologi.",
  "AI dan teknologi sebagai alat bantu berkarya, bukan pengganti berpikir.",
  "Membuka hubungan dengan keluarga, komunitas, dunia usaha, dan profesional.",
  "Memberikan ruang bagi anak yang memiliki minat khusus untuk berkembang.",
]
</script>

<template>
  <div class="landing-page-wrapper mt-16">
    <Navbar :active-id="activeSectionId" />
    
    <VContainer>
      <div class="about-page">
        <!-- Hero Header -->
        <div class="hero-section text-center mb-16">
          <h1 class="text-h2 font-weight-bold mb-4 text-primary">
            Jaz Academy
          </h1>
          <h2 class="text-h4 font-weight-medium text-high-emphasis">
            Komunitas & Rumah Belajar Generasi Muslim
          </h2>
        </div>

        <VRow class="mb-16">
          <VCol
            cols="12"
            md="6"
            class="d-flex align-center"
          >
            <div>
              <h3 class="text-h3 font-weight-bold mb-6 text-primary">
                Tentang Jaz Academy
              </h3>
              <p
                class="text-h6 font-weight-regular text-high-emphasis mb-6"
                style="line-height: 1.6;"
              >
                Jaz Academy adalah <span class="text-primary">komunitas dan rumah belajar</span> bagi anak dan remaja untuk bertumbuh menjadi generasi Muslim yang beriman, mandiri, berpikir kritis, terampil, serta produktif. Tempat ini menghubungkan nilai <span class="text-primary">agama, pengetahuan, teknologi, dan kehidupan</span> agar pembelajaran tidak sekadar materi di dalam kelas.
              </p>
              <p
                class="text-h6 font-weight-regular text-high-emphasis mb-6"
                style="line-height: 1.6;"
              >
                Melalui pendekatan berbasis <span class="text-primary">proyek (project-based learning), diskusi, dan mentoring,</span> setiap anak bebas berkembang sesuai minat dan kecepatannya. Jaz Academy membimbing mereka menggunakan pengetahuan dan teknologi dan AI sebagai alat untuk <span class="text-primary">berkarya dan menghasilkan manfaat nyata bagi kehidupan.</span>
              </p>
            </div>
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VCard
              class="pa-8 bg-light-primary text-center rounded-xl fill-height d-flex flex-column justify-center"
              elevation="0"
            >
              <VIcon
                icon="tabler-school"
                size="80"
                color="primary"
                class="mb-4 mx-auto"
              />
              <h3 class="text-h2 font-weight-bold mb-4 text-primary">
                Visi
              </h3>
              <p
                class="text-h4 font-weight-medium text-high-emphasis"
                style="line-height: 1.5;"
              >
                "Membentuk generasi Muslim yang beriman, berilmu, mandiri, adaptif, dan produktif."
              </p>
            </VCard>
          </VCol>
        </VRow>

        <!-- Misi Section -->
        <div class="mb-16">
          <h3 class="text-h2 font-weight-bold text-center mb-10 text-primary">
            Misi Kami
          </h3>
          <VRow>
            <VCol
              v-for="(misi, index) in missions"
              :key="index"
              cols="12"
              sm="6"
              md="3"
            >
              <VCard
                class="pa-6 text-center fill-height rounded-lg border"
                elevation="0"
              >
                <VAvatar
                  color="primary"
                  variant="tonal"
                  size="60"
                  class="mb-4 font-weight-bold text-h4"
                >
                  {{ index + 1 }}
                </VAvatar>
                <p
                  class="text-h6 font-weight-medium text-high-emphasis"
                  style="line-height: 1.5;"
                >
                  {{ misi }}
                </p>
              </VCard>
            </VCol>
          </VRow>
        </div>

        <!-- Filosofi Pembelajaran -->
        <VCard
          class="pa-10 text-center rounded-xl mb-16"
          color="primary"
          elevation="4"
        >
          <h3 class="text-h2 font-weight-bold mb-10 text-white">
            Filosofi Pembelajaran
          </h3>
          
          <div class="d-flex flex-wrap justify-center align-center gap-6 mb-12">
            <div class="d-flex flex-column align-center">
              <VAvatar
                color="surface"
                size="80"
                class="mb-3"
              >
                <VIcon
                  icon="tabler-book"
                  color="primary"
                  size="40"
                />
              </VAvatar>
              <span class="text-h5 font-weight-bold text-white">Belajar</span>
            </div>
            <VIcon
              icon="tabler-arrow-right"
              size="40"
              color="white"
            />
            <div class="d-flex flex-column align-center">
              <VAvatar
                color="surface"
                size="80"
                class="mb-3"
              >
                <VIcon
                  icon="tabler-flask"
                  color="primary"
                  size="40"
                />
              </VAvatar>
              <span class="text-h5 font-weight-bold text-white">Mencoba</span>
            </div>
            <VIcon
              icon="tabler-arrow-right"
              size="40"
              color="white"
            />
            <div class="d-flex flex-column align-center">
              <VAvatar
                color="surface"
                size="80"
                class="mb-3"
              >
                <VIcon
                  icon="tabler-hammer"
                  color="primary"
                  size="40"
                />
              </VAvatar>
              <span class="text-h5 font-weight-bold text-white">Menghasilkan</span>
            </div>
            <VIcon
              icon="tabler-arrow-right"
              size="40"
              color="white"
            />
            <div class="d-flex flex-column align-center">
              <VAvatar
                color="surface"
                size="80"
                class="mb-3"
              >
                <VIcon
                  icon="tabler-bulb"
                  color="primary"
                  size="40"
                />
              </VAvatar>
              <span class="text-h5 font-weight-bold text-white">Merefleksikan</span>
            </div>
            <VIcon
              icon="tabler-arrow-right"
              size="40"
              color="white"
            />
            <div class="d-flex flex-column align-center">
              <VAvatar
                color="surface"
                size="80"
                class="mb-3"
              >
                <VIcon
                  icon="tabler-trending-up"
                  color="primary"
                  size="40"
                />
              </VAvatar>
              <span class="text-h5 font-weight-bold text-white">Berkembang</span>
            </div>
          </div>

          <VRow justify="center">
            <VCol
              cols="12"
              md="10"
            >
              <p
                class="text-h5 font-weight-medium mb-6 text-white"
                style="line-height: 1.6;"
              >
                Anak tidak hanya ditanya: <br> <strong>"Apa yang kamu ketahui?"</strong>
              </p>
              <p
                class="text-h5 font-weight-medium mb-8 text-white"
                style="line-height: 1.6;"
              >
                Tetapi juga: <br> <strong>"Apa yang bisa kamu lakukan dengan pengetahuan itu?"</strong>
              </p>
              <p
                class="text-h5 font-weight-regular text-white"
                style="line-height: 1.6;"
              >
                Karena itu, keberhasilan belajar tidak hanya diukur melalui ujian, tetapi melalui <strong>kompetensi, proses berpikir, karya, kontribusi, dan perkembangan pribadi.</strong>
              </p>
            </VCol>
          </VRow>
          <RouterLink to="/front/learning">
            <VBtn 
              height="36"
              color="surface"
              class="my-6"
            >
              <span class="text-primary">Kurikulum & Metode Pembelajaran</span>
            </VBtn>
          </RouterLink>
        </VCard>
      </div>
    </VContainer>

    <Footer />
  </div>
</template>

<style lang="scss">
.about-page {
  padding-block: 1rem 5rem;
}

.hero-section {
  padding-block-start: 3rem;
}

.bg-light-primary {
  background-color: rgba(var(--v-theme-primary), 0.05);
}

@media (min-width: 600px) {
  .landing-page-wrapper {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}
</style>
