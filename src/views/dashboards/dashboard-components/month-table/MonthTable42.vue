<template>
  <div>
    <div v-if="hasAccess">
      <div>

        <b-row>
          <b-col cols="12" md="4">
            <b-form-group
                label-for="filter-input"
                label-align-sm="right"
                class="mb-2"
            >
              <b-input-group>


                <b-input-group-append>
                  <b-button
                      variant="danger"
                      :disabled="!filter"
                      @click="filter = ''"
                  >تفريغ</b-button
                  >
                </b-input-group-append>
                <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="اكتب شيء للبحث"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="4" cols="12">
          </b-col>
          <b-col md="4" cols="12" class="text-left">
            <div class="ml-auto mt-2 mt-md-0">
              <div class="btn-grp"></div>
            </div>
          </b-col>
        </b-row>

        <b-table
            responsive
            class="mb-0 mt-3 text-right"
            :items="items"
            :fields="fields"
            :filter="filter"
            :current-page="currentPage"
            :per-page="perPage"
            table-class="bg-transparent text-nowrap"
            v-if="items.filter((element) => element != null).length > 0"
            empty-text="لايوجد بيانات"
        >

          <template #cell(show_details)="row">
            <div class="d-flex align-items-center">
              <b-form-checkbox
                  v-model="row.detailsShowing"
                  @change="row.toggleDetails()"
              >
                تفاصيل
              </b-form-checkbox>
            </div>
          </template>

          <template #row-details="row">
            <b-card class="border" style="background-color: #EEF5F9">


              <b-tabs content-class="mt-3" fill justified>


                <b-tab title="معلومات المؤسسة">
                  <b-row>
                    <b-col cols="12" md="2" lg="4">
                      <b-form-group
                          id="input-group-1"
                          label="اسم مدير المؤسسة*:"
                          label-for="input-1"
                          class="text-right"
                      >
                        <b-form-input
                            id="input-1"
                            v-model="row.item.director_name"
                            type="text"
                            readonly
                            placeholder="ادخل اسم مدير المؤسسة"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="2" lg="4" v-if="row.item.type == 'primary'">
                      <b-form-group
                          id="input-group-1"
                          label="اسم نائب مدير المؤسسة*:"
                          label-for="input-1"
                          class="text-right"
                      >
                        <b-form-input
                            id="input-1"
                            v-model="row.item.vice_director_name"
                            type="text"
                            readonly
                            placeholder="ادخل اسم نائب مدير المؤسسة"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="2" lg="4" v-if="row.item.type == 'secondary'">
                      <b-form-group
                          id="input-group-1"
                          label="اسم ناظر المؤسسة*:"
                          label-for="input-1"
                          class="text-right"
                      >
                        <b-form-input
                            id="input-1"
                            readonly
                            v-model="row.item.vice_director_name"
                            type="text"
                            placeholder="ادخل اسم ناظر المؤسسة"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>

                    <b-col cols="12" md="2" lg="4" v-if="row.item.type !== 'primary'">
                      <b-form-group
                          id="input-group-1"
                          label="اسم مستشار التربية*:"
                          label-for="input-1"
                          class="text-right"
                      >
                        <b-form-input
                            id="input-1"
                            readonly
                            v-model="row.item.education_consultant"
                            type="text"
                            placeholder="ادخل اسم مستشار التربية"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="2" lg="4" v-if="row.item.type !== 'primary'">
                      <b-form-group
                          id="input-group-1"
                          label="اسم مستشار التوجيه*:"
                          label-for="input-1"
                          class="text-right"
                      >
                        <b-form-input
                            id="input-1"
                            readonly
                            v-model="row.item.guidance_consultant"
                            type="text"
                            placeholder="ادخل اسم مستشار التوجيه"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="2" lg="4" v-if="row.item.type !== 'primary'">
                      <b-form-group
                          id="input-group-1"
                          label="اسم المقتصد*:"
                          label-for="input-1"
                          class="text-right"
                      >
                        <b-form-input
                            id="input-1"
                            readonly
                            v-model="row.item.savin"
                            type="text"
                            placeholder="ادخل اسم المقتصد"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="2" lg="4" v-if="row.item.type !== 'primary'">
                      <b-form-group
                          id="input-group-1"
                          label="اسم نائب المقتصد*:"
                          label-for="input-1"
                          class="text-right"
                      >
                        <b-form-input
                            id="input-1"
                            readonly
                            v-model="row.item.vice_savin"
                            type="text"
                            placeholder="ادخل اسم نائب المقتصد"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="2" lg="4" v-if="row.item.type !== 'primary'">
                      <b-form-group
                          id="input-group-1"
                          label="اسم عون المصالح الاقتصادية*:"
                          label-for="input-1"
                          class="text-right"
                      >
                        <b-form-input
                            id="input-1"
                            v-model="row.item.helper_savin"
                            type="text"
                            readonly
                            placeholder="ادخل اسم عون المصالح الاقتصادية"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="2" lg="2" v-if="row.item.type == 'secondary'">
                      <b-form-group
                          id="input-group-1"
                          label="عدد الشعب*:"
                          label-for="input-1"
                          class="text-right"
                      >
                        <b-form-input
                            id="input-1"
                            v-model="row.item.fields_number"
                            type="number"
                            readonly
                            placeholder="ادخل عدد الشعب"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="2" lg="2">
                      <b-form-group
                          id="input-group-1"
                          label="عدد الاساتذة*:"
                          label-for="input-1"
                          class="text-right"
                      >
                        <b-form-input
                            id="input-1"
                            readonly
                            v-model="row.item.teachers.length"
                            type="number"
                            placeholder="ادخل عدد الاساتذة"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="2" lg="2">
                      <b-form-group
                          id="input-group-1"
                          label="عدد المشرفين*:"
                          label-for="input-1"
                          class="text-right"
                      >
                        <b-form-input
                            id="input-1"
                            readonly
                            :value="row.item.employees.filter((element) => element.is_supervisor == 1).length"
                            type="number"
                            placeholder="ادخل عدد المشرفين"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>



                    <b-col cols="12" md="2" lg="2">
                      <b-form-group
                          id="input-group-1"
                          label="عدد الحجرات*:"
                          label-for="input-1"
                          class="text-right"
                      >
                        <b-form-input
                            id="input-1"
                            v-model="row.item.rooms_number"
                            type="number"
                            readonly
                            placeholder="ادخل عدد الحجرات"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="2" lg="2">
                      <b-form-group
                          id="input-group-1"
                          label="عدد الافواج التربوية*:"
                          label-for="input-1"
                          class="text-right"
                      >
                        <b-form-input
                            id="input-1"
                            :value="getGroupsTotal(row.item.levels)"
                            type="number"
                            readonly
                            placeholder="ادخل عدد الافواج التربوية"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="2" lg="2">
                      <b-form-group
                          id="input-group-1"
                          label="عدد تلاميذ المؤسسة*:"
                          label-for="input-1"
                          class="text-right"
                      >
                        <b-form-input
                            id="input-1"
                            readonly
                            :value="getStudentsTotal(row.item.levels)"
                            type="number"
                            placeholder="ادخل عدد تلاميذ المؤسسة"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="2" lg="2">
                      <b-form-group
                          id="input-group-1"
                          label="عدد عمال المؤسسة*:"
                          label-for="input-1"
                          class="text-right"
                      >
                        <b-form-input
                            id="input-1"
                            :value="row.item.employees.filter((element) => element.is_supervisor == 0).length"
                            type="number"
                            readonly
                            placeholder="ادخل عدد عمال المؤسسة"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>

                    <b-col cols="12" md="2" lg="4">
                      <b-form-group
                          id="input-group-2"
                          label="نظام المؤسسة*:"
                          label-for="input-2"
                          class="text-right"
                      >
                        <b-form-input
                            id="input-1"
                            readonly
                            :value="getSchoolSystem(row.item.school_system)"
                            placeholder="ادخل نظام المؤسسة"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>

                  </b-row>
                </b-tab>



                <b-tab title="الافواج التربوية">
                  <b-row>
                    <b-col cols="12" md="4">
                      <b-form-group
                          label-for="filter-input"
                          label-align-sm="right"
                          class="mb-2"
                      >
                        <b-input-group>
                          <b-input-group-append>
                            <b-button
                                variant="danger"
                                :disabled="!filter2"
                                @click="filter2 = ''"
                            >تفريغ</b-button
                            >
                          </b-input-group-append>
                          <b-form-input
                              id="filter-input"
                              v-model="filter2"
                              type="search"
                              placeholder="اكتب شيء للبحث"
                          ></b-form-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" cols="12"></b-col>
                    <b-col md="4" cols="12" class="text-left"></b-col>
                  </b-row>
                  <b-table
                      responsive
                      class="mb-0 mt-3 text-right"
                      :items="row.item.levels"
                      :fields="fields2"
                      :filter="filter2"
                      :current-page="currentPage2"
                      :per-page="perPage2"
                      table-class="bg-transparent text-nowrap"
                      v-if="row.item.levels.length > 0"
                      empty-text="لايوجد بيانات"
                  ></b-table>

                  <div v-if="row.item.levels.length > 0">
                    <b-pagination
                        class="mt-3 float-left"
                        v-model="currentPage2"
                        :total-rows="row.item.levels.length"
                        :per-page="perPage2"
                    ></b-pagination>
                  </div>

                  <center v-else>
                    <b-spinner v-if="isLoading" label="Loading..."></b-spinner>
                    <div v-else>
                      <br/>
                      <br/>
                      <b-img :src="require('@/assets/images/folder.png')" width="150" height="150"/>
                      <br/>
                      <br/>
                      <h5>لايوجد بيانات</h5>
                    </div>
                  </center>
                </b-tab>



                <b-tab title="الاساتذة">
                  <b-row>
                    <b-col cols="12" md="4">
                      <b-form-group
                          label-for="filter-input"
                          label-align-sm="right"
                          class="mb-2"
                      >
                        <b-input-group>
                          <b-input-group-append>
                            <b-button
                                variant="danger"
                                :disabled="!filter3"
                                @click="filter3 = ''"
                            >تفريغ</b-button
                            >
                          </b-input-group-append>
                          <b-form-input
                              id="filter-input"
                              v-model="filter3"
                              type="search"
                              placeholder="اكتب شيء للبحث"
                          ></b-form-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" cols="12"></b-col>
                    <b-col md="4" cols="12" class="text-left"></b-col>
                  </b-row>

                  <b-table
                      responsive
                      class="mb-0 mt-3 text-right"
                      :items="row.item.teachers"
                      :fields="fields3"
                      :filter="filter3"
                      :current-page="currentPage3"
                      :per-page="perPage3"
                      table-class="bg-transparent text-nowrap"
                      v-if="row.item.teachers.length > 0"
                      empty-text="لايوجد بيانات"
                  ></b-table>

                  <div v-if="row.item.teachers.length > 0">
                    <b-pagination
                        class="mt-3 float-left"
                        v-model="currentPage3"
                        :total-rows="row.item.teachers.length"
                        :per-page="perPage3"
                    ></b-pagination>
                  </div>

                  <center v-else>
                    <b-spinner v-if="isLoading" label="Loading..."></b-spinner>
                    <div v-else>
                      <br/>
                      <br/>
                      <b-img :src="require('@/assets/images/folder.png')" width="150" height="150"/>
                      <br/>
                      <br/>
                      <h5>لايوجد بيانات</h5>
                    </div>
                  </center>
                </b-tab>



                <b-tab title="العمال الاداريين والمهنيين">
                  <b-row>
                    <b-col cols="12" md="4">
                      <b-form-group
                          label-for="filter-input"
                          label-align-sm="right"
                          class="mb-2"
                      >
                        <b-input-group>
                          <b-input-group-append>
                            <b-button
                                variant="danger"
                                :disabled="!filter4"
                                @click="filter4 = ''"
                            >تفريغ</b-button
                            >
                          </b-input-group-append>
                          <b-form-input
                              id="filter-input"
                              v-model="filter4"
                              type="search"
                              placeholder="اكتب شيء للبحث"
                          ></b-form-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" cols="12">
                    </b-col>
                    <b-col md="4" cols="12" class="text-left">

                    </b-col>
                  </b-row>
                  <b-table
                      responsive
                      class="mb-0 mt-3 text-right"
                      :items="row.item.employees.filter((element)=> element.is_supervisor == false)"
                      :fields="fields4"
                      :filter="filter4"
                      :current-page="currentPage4"
                      :per-page="perPage4"
                      table-class="bg-transparent text-nowrap"
                      v-if="row.item.employees.filter((element)=> element.is_supervisor == false).length > 0"
                      empty-text="لايوجد بيانات"
                  >
                  </b-table>
                  <div v-if="row.item.employees.filter((element)=> element.is_supervisor == false).length > 0">
                    <b-pagination
                        class="mt-3 float-left"
                        v-model="currentPage4"
                        :total-rows="row.item.employees.filter((element)=> element.is_supervisor == false).length"
                        :per-page="perPage4"
                    ></b-pagination>
                  </div>
                  <center v-else>
                    <b-spinner v-if="isLoading" label="Loading..."></b-spinner>
                    <div v-else>
                      <br/>
                      <br/>
                      <b-img :src="require('@/assets/images/folder.png')" width="150" height="150"/>
                      <br/>
                      <br/>
                      <h5>لايوجد بيانات</h5>
                    </div>
                  </center>
                </b-tab>



                <b-tab title="المشرفين التربويين">
                  <b-row>
                    <b-col cols="12" md="4">
                      <b-form-group
                          label-for="filter-input"
                          label-align-sm="right"
                          class="mb-2"
                      >
                        <b-input-group>
                          <b-input-group-append>
                            <b-button
                                variant="danger"
                                :disabled="!filter5"
                                @click="filter5 = ''"
                            >تفريغ</b-button
                            >
                          </b-input-group-append>
                          <b-form-input
                              id="filter-input"
                              v-model="filter5"
                              type="search"
                              placeholder="اكتب شيء للبحث"
                          ></b-form-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" cols="12">
                    </b-col>
                    <b-col md="4" cols="12" class="text-left">

                    </b-col>
                  </b-row>
                  <b-table
                      responsive
                      class="mb-0 mt-3 text-right"
                      :items="row.item.employees.filter((element)=> element.is_supervisor == true)"
                      :fields="fields5"
                      :filter="filter5"
                      :current-page="currentPage5"
                      :per-page="perPage5"
                      table-class="bg-transparent text-nowrap"
                      v-if="row.item.employees.filter((element)=> element.is_supervisor == true).length > 0"
                      empty-text="لايوجد بيانات"
                  >
                  </b-table>
                  <div v-if="row.item.employees.filter((element)=> element.is_supervisor == true).length > 0">
                    <b-pagination
                        class="mt-3 float-left"
                        v-model="currentPage5"
                        :total-rows="row.item.employees.filter((element)=> element.is_supervisor == true).length"
                        :per-page="perPage5"
                    ></b-pagination>
                  </div>
                  <center v-else>
                    <b-spinner v-if="isLoading" label="Loading..."></b-spinner>
                    <div v-else>
                      <br/>
                      <br/>
                      <b-img :src="require('@/assets/images/folder.png')" width="150" height="150"/>
                      <br/>
                      <br/>
                      <h5>لايوجد بيانات</h5>
                    </div>
                  </center>
                </b-tab>
              </b-tabs>




            </b-card>
          </template>

        </b-table>

        <div v-if="items.filter((element) => element != null).length > 0">
          <b-pagination
              class="mt-3 float-left"
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
          ></b-pagination>
        </div>

        <center v-else>
          <b-spinner v-if="isLoading" label="Loading..."></b-spinner>
          <div v-else>
            <br/>
            <br/>
            <b-img :src="require('@/assets/images/folder.png')" width="150" height="150"/>
            <br/>
            <br/>
            <h5>لايوجد بيانات</h5>
          </div>
        </center>

      </div>
    </div>
    <div v-else>
      <center>
        <br/>
        <br/>
        <b-img :src="require('@/assets/images/folder.png')" width="150" height="150"/>
      </center>
    </div>
  </div>
</template>
<script>
export default {
  name: "MonthTable4",
  data: () => ({
    title: "MonthTable4",
    showError: false,
    showSuccess: false,
    filter: null,
    fields: [
      {
        key: "school_name",
        label: "اسم المؤسسة",
      },
      {
        key: "address",
        label: "العنوان",
      },
      {
        key: "phone",
        label: "رقم الهاتف",
      },
      {
        key: "fax",
        label: "رقم الفاكس",
      },
      {
        key: "director_name",
        label: "المدير",
      },
      {
        key: "show_details",
        label: "",
      },
    ],
    items: [],
    totalRows: 1,
    currentPage: 1,
    perPage: 5,

    filter2: null,
    fields2: [
      {
        key: "name",
        label: "المستوى",
      },
      {
        key: "groups_number",
        label: "عدد الافواج",
      },
      {
        key: "students_number",
        label: "العدد الكلي للتلاميذ",
      },
    ],
    currentPage2: 1,
    perPage2: 5,

    filter3: null,
    fields3: [
      {
        key: "name",
        label: "الاسم واللقب",
      },
      {
        key: "module",
        label: "مادة التدريس",
      },
      {
        key: "rank",
        label: "الرتبة",
      },
      {
        key: "degree",
        label: "الدرجة",
      },
      {
        key: "hiring_date",
        label: "تاريخ التعيين",
      },
      {
        key: "show_details",
        label: "",
      },
    ],
    currentPage3: 1,
    perPage3: 5,

    filter4: null,
    fields4: [
      {
        key: "name",
        label: "الاسم واللقب",
      },
      {
        key: "rank",
        label: "الرتبة",
      },
      {
        key: "other",
        label: "ملاحظة",
      },
      {
        key: "show_details",
        label: "",
      },
    ],
    currentPage4: 1,
    perPage4: 5,

    filter5: null,
    fields5: [
      {
        key: "name",
        label: "الاسم واللقب",
      },
      {
        key: "rank",
        label: "الرتبة",
      },
      {
        key: "other",
        label: "ملاحظة",
      },
      {
        key: "show_details",
        label: "",
      },
    ],
    currentPage5: 1,
    perPage5: 5,

    pageOptions: [5, 10, 15, { value: 100, text: "اضهر اكثر" }],
    hasAccess: false,
    showErrorInvalid: false,
    isLoading: false
  }),
  mounted() {
    var role = localStorage.getItem("role");
    this.hasAccess = role === "admin"

    // Set the initial number of items

    this.getAllSchools()
  },
  methods: {
    getAllSchools() {
      this.isLoading = true
      this.$http.get("primary/get-all?type=middle")
          .then(response => {
            this.isLoading = false
            if(response.status === 200){
              this.items = response.data.data
            }else{
              this.items = []
            }
            this.totalRows = this.items.filter((element) => element != null).length;
            console.log(response.data.data)
          })
          .catch(error => {
            this.isLoading = false
            console.log(error.response.data)
          });
    },
    hideAlerts() {
      this.showError = false
      this.showSuccess = false
    },
    getGroupsTotal(levels) {
      var total = 0
      for(var i=0; i<levels.length; i++) {
        total = total + parseInt(levels[i].groups_number)
      }
      return total
    },
    getStudentsTotal(levels) {
      var total = 0
      for(var i=0; i<levels.length; i++) {
        total = total + parseInt(levels[i].students_number)
      }
      return total
    },
    getSchoolSystem(system) {
      switch(system) {
        case "internal":
          return "داخلي"
        case "external":
          return "خارجي"
        case "semi-internal":
          return "نصف داخلي"
      }
    }
  },
};
</script>

<style>
.nav {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  margin-right: 0;
  padding-right: 0;
}
</style>