<script setup>
import Footer from '@/views/front/front-page-footer.vue'
import Navbar from '@/views/front/front-page-navbar.vue'
import { ref } from 'vue'

definePage({ meta: { layout: 'blank' } })

const activeSectionId = ref(null)
</script>

<template>
  <div class="landing-page-wrapper mt-16">
    <Navbar :active-id="activeSectionId" />

    <VContainer>
      <div class="contact-page">
        <div class="text-center mb-16 pt-10">
          <h1 class="text-h2 font-weight-bold mb-4 text-primary">
            Hubungi Kami
          </h1>
          <p class="text-h5 text-high-emphasis">
            Mari berkolaborasi dan menjadi bagian dari ekosistem belajar Jaz Academy.
          </p>
        </div>

        <VRow class="mb-16">
          <VCol
            cols="12"
            md="6"
          >
            <VCard
              class="pa-10 bg-primary text-white rounded-xl fill-height d-flex flex-column justify-center"
              elevation="4"
            >
              <h3 class="text-h3 font-weight-bold mb-8 text-white">
                Jaz sebagai Rumah Belajar
              </h3>
              <p
                class="text-h6 font-weight-regular text-white mb-6"
                style="line-height: 1.6;"
              >
                Jaz bukan hanya tempat anak datang untuk mengikuti kelas. Jaz adalah tempat untuk:
              </p>
              <VSheet
                color="white"
                class="pa-5 mb-8 rounded-lg text-center"
              >
                <p
                  class="text-h5 font-weight-bold text-primary mb-0"
                  style="line-height: 1.5;"
                >
                  Belajar &rarr; Bertemu &rarr; Bereksperimen &rarr; Berkarya &rarr; Berkolaborasi &rarr; Berkontribusi
                </p>
              </VSheet>
              <p
                class="text-h6 font-weight-regular text-white mb-6"
                style="line-height: 1.6;"
              >
                Karena itu komunitas menjadi bagian dari pendidikan. Orang tua, mentor, guru, profesional, pengusaha, komunitas dan masyarakat dapat menjadi bagian dari ekosistem belajar.
              </p>
              <p
                class="text-h6 font-weight-regular text-white mt-4"
                style="line-height: 1.6;"
              >
                Anak tidak hanya belajar tentang dunia. <br>
                <strong class="text-h4 mt-2 d-inline-block text-white font-weight-bold">Anak belajar langsung dari dunia.</strong>
              </p>
            </VCard>
          </VCol>

          <VCol
            cols="12"
            md="6"
          >
            <VCard
              class="pa-10 rounded-xl border fill-height"
              elevation="0"
            >
              <h3 class="text-h3 font-weight-bold mb-10 text-primary">
                Informasi Kontak
              </h3>
              
              <div class="d-flex align-center mb-8">
                <VAvatar
                  color="primary"
                  variant="tonal"
                  class="me-6"
                  size="64"
                >
                  <VIcon
                    icon="tabler-map-pin"
                    size="32"
                  />
                </VAvatar>
                <div>
                  <h5 class="text-h5 font-weight-bold mb-1">
                    Alamat
                  </h5>
                  <p class="text-h6 font-weight-regular mb-0 text-high-emphasis">
                    Komplek Villa Latansa Kp. Sukahaji Desa Dawagung Kec. Rajapolah Tasikmalaya, Jawa Barat 46464
                  </p>
                </div>
              </div>

              <div class="d-flex align-center mb-8">
                <VAvatar
                  color="primary"
                  variant="tonal"
                  class="me-6"
                  size="64"
                >
                  <VIcon
                    icon="tabler-mail"
                    size="32"
                  />
                </VAvatar>
                <div>
                  <h5 class="text-h5 font-weight-bold mb-1">
                    Email
                  </h5>
                  <p class="text-h6 font-weight-regular mb-0 text-high-emphasis">
                    admin@jazacademy.id
                  </p>
                </div>
              </div>

              <div class="d-flex align-center mb-10">
                <VAvatar
                  color="primary"
                  variant="tonal"
                  class="me-6"
                  size="64"
                >
                  <VIcon
                    icon="tabler-phone"
                    size="32"
                  />
                </VAvatar>
                <div>
                  <h5 class="text-h5 font-weight-bold mb-1">
                    Telepon / WhatsApp
                  </h5>
                  <p class="text-h6 font-weight-regular mb-0 text-high-emphasis">
                    +62 81 2222 999 64
                  </p>
                </div>
              </div>

              <div class="d-flex align-center mt-auto">
                <VBtn
                  icon
                  color="primary"
                  variant="tonal"
                  class="me-4"
                  size="large"
                  href="https://www.instagram.com/jazacademy.id"
                >
                  <VIcon
                    icon="tabler-brand-instagram"
                    size="28"
                  />
                </VBtn>
                <VBtn
                  icon
                  color="primary"
                  variant="tonal"
                  class="me-4"
                  size="large"
                  href="https://www.facebook.com/jazacademy.id"
                >
                  <VIcon
                    icon="tabler-brand-facebook"
                    size="28"
                  />
                </VBtn>
                <VBtn
                  icon
                  color="primary"
                  variant="tonal"
                  size="large"
                  href="https://www.youtube.com/@jazacademy"
                >
                  <VIcon
                    icon="tabler-brand-youtube"
                    size="28"
                  />
                </VBtn>
              </div>
            </VCard>
          </VCol>
        </VRow>
      </div>
    </VContainer>

    <Footer />
  </div>
</template>

<style lang="scss">
.contact-page {
  padding-block: 1rem 5rem;
}

@media (min-width: 600px) {
  .landing-page-wrapper {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}
</style>
