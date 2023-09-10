<template>
  <div>

    <b-row>
      <!--      <b-col cols="12" md="6" xl="6" class="d-flex align-items-stretch mb-8">-->
      <!--        <CarouselAnimation />-->
      <!--      </b-col>-->
      <b-col cols="12" class="d-flex align-items-stretch">
        <BaseCard>
          <template v-slot:comcode>
            <div>
              <div class="d-flex flex-row">
                <div>
                  <img
                      src="@/assets/images/logo.png"
                      alt="logo"
                      class="rounded-circle mt-2"
                      width="150"
                      height="100"
                  />
                </div>
                <div class="pl-2 mt-4 mr-2">
                  <h1 class="mb-2 float-right">مديرية التربية</h1>
                  <br>
                  <h6 class="mb-3 float-right">ولاية بشار</h6>
                </div>
              </div>
              <hr class="custom-hr" />
              <b-row>
                <b-col cols="12" md="4" class="text-center d-flex align-items-center justify-content-center">
                  <b-card class="mb-1 text-center">
                    <img src="@/assets/images/classroom.png" class="img-fluid" width="65"/>
                    <h5 class="card-title mt-2 mb-1 pb-1">الابتدائيات ({{primaries}})</h5>

                    <b-button block href="/education-admin/primary-schools" pill variant="danger" class="mt-1 d-flex align-items-center justify-content-center text-center" style="width: 200px">
                      اضهار
                    </b-button>
                  </b-card>
                </b-col>
                <b-col class="text-center d-flex align-items-center justify-content-center" cols="12" md="4">
                  <b-card class="mb-1 text-center">
                    <img src="@/assets/images/classroom.png" class="img-fluid" width="65" />
                    <h5 class="card-title mt-2 mb-1 pb-1">المتوسطات ({{middles}})</h5>

                    <b-button block href="/education-admin/middle-schools" pill variant="primary" class="mt-1 d-flex align-items-center justify-content-center" style="width: 200px">
                      اضهار
                    </b-button>
                  </b-card>
                </b-col>
                <b-col class="text-center d-flex align-items-center justify-content-center" cols="12" md="4">
                  <b-card class="mb-1 text-center">
                    <img src="@/assets/images/classroom.png" class="img-fluid" width="65" />
                    <h5 class="card-title mt-2 mb-1 pb-1">الثانويات ({{secondaries}})</h5>

                    <b-button block href="/education-admin/secondary-schools" pill variant="warning" class="mt-1 d-flex align-items-center justify-content-center text-white" style="width: 200px">
                      اضهار
                    </b-button>
                  </b-card>
                </b-col>
              </b-row>
            </div>
          </template>
        </BaseCard>
      </b-col>
    </b-row>


  </div>
</template>

<script>
import BaseCard from '../../components/card/BaseCard';
export default {
  name: "Home",
  components:{
    //CarouselAnimation: () => import("@/components/ui/carousel/CarouselAnimation"),
    BaseCard
  },
  data: () => ({
    primaries: 0,
    middles: 0,
    secondaries: 0,
    isLoading: false
  }),
  methods: {
    getSchoolsData() {
      this.isLoading = true
      this.$http.get("schools/get-schools-count")
          .then(response => {
            this.isLoading = false
            if(response.status === 200){
              this.primaries = response.data.primaries
              this.middles = response.data.middles
              this.secondaries = response.data.secondaries
            }
            console.log(response.data.data)
          })
          .catch(error => {
            this.isLoading = false
            console.log(error.response.data)

          });
    },
  },
  mounted() {
    this.getSchoolsData()
  }
}
</script>

<style scoped>

</style>