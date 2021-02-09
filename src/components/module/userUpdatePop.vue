<template lang="pug">
  div.m_userUpdate_pop(:class="isLeft")  
    div.m-pop 
      div( v-if="option == 'height'" )
        p.m-pop_inputTitle 請填寫身高
        div(class="form-row")
          div(class="form-group col-md-12")
            b-form-select(v-model="height" :options="heightOption") 
      div( v-if="option == 'age'" )
        p.m-pop_inputTitle 請填寫年紀
        div(class="form-row")
          div(class="form-group col-md-12")
            b-form-select(v-model="age" :options="ageOption") 

      div( v-if="option == 'education'" )
        p.m-pop_inputTitle 請填寫學歷
        div(class="form-row")
          div(class="form-group col-md-12")
            input(type="text" class="form-control" autocomplete="off" id="education" name="education" maxlength="7" v-model="education" placeholder="Your education") 

      div( v-if="option == 'gender'" )
        p.m-pop_inputTitle 請選擇姓別
        div(class="form-row")
          div(class="form-check form-check-inline h-ml-1")
            input(class="form-check-input" type="radio" name="maleRadio" v-model="male" id="maleRadio1" value="1") 
            label(class="form-check-label" for="maleRadio1")  男
          div(class="form-check form-check-inline")
            input(class="form-check-input" type="radio" name="maleRadio" v-model="male" id="maleRadio2" value="0")
            label(class="form-check-label" for="maleRadio2") 女  

      div( v-if="option == 'city'" )
        p.m-pop_inputTitle 請填寫居住地
        div(class="form-row")
          div(class="form-group col-md-12")
            input(type="text" class="form-control" autocomplete="off" id="city" name="city" maxlength="7" v-model="city" placeholder="Your city") 

      div( v-if="option == 'bloodType'" )
        p.m-pop_inputTitle 請選擇血型
        div(class="form-row")
          div(class="form-group col-md-12")
            b-form-select(v-model="bloodType" :options="bloodOption") 

      div( v-if="option == 'career'" )
        p.m-pop_inputTitle 請填寫職業
        div(class="form-row")
          div(class="form-group col-md-12")
            input(type="text" class="form-control" autocomplete="off" id="career" name="career" maxlength="7" v-model="career" placeholder="Your career") 

      div.m-pop_button
        a(class="btn btn-danger btn-sm h-ml-2 rounded-pill" @click="closeDrop()") 關閉
        a(class="btn btn-outline-primary btn-sm h-ml-2 rounded-pill" @click="submit()") 送出   
    
</template>

<script>
import { mapState,mapMutations } from "vuex";

export default {
  name: 'userUpdatePop',
  components: {
  },   
  props:{
    option:{ //哪個欄位
      type:String,
      default:""
    },
    isDropLeft:{ //dropdown展開方向
        type:Boolean,
        default:false
    },
    formData:{
        type:Object,
        default: function () {
          return { 
            account: '', //帳號不能修改
            name: '',
            male:'1', //0 woman ,1 man
            age:'',
            height:'',
            career:'',
            city:"",
            education:"",
            bloodType:'',
            photo:[],
            info:""
          }
        }
    }
  },
  data () {
    return {  
        name: this.formData.name,
        male:this.formData.male, //0 woman ,1 man
        age:this.formData.age,
        height:this.formData.height,
        career:this.formData.career,
        city:this.formData.city,
        education:this.formData.education,
        bloodType:this.formData.bloodType,
        avatar:this.formData.photo,
        info:this.formData.info,
        bloodOption:[
          { value: '', text: '選擇血型',disabled: true },
          { value: 'A', text: 'A型' },
          { value: 'B', text: 'B型' },
          { value: 'O', text: 'O型' },
          { value: 'AB', text: 'AB型' }
        ],
        heightOption:[
          { value: '', text: '選擇身高',disabled: true },
          { value: '130', text: '130cm' },
          { value: '131', text: '131cm' },
          { value: '132', text: '132cm' },
          { value: '133', text: '133cm' },            
          { value: '134', text: '134cm' },           
          { value: '135', text: '135cm' },            
          { value: '136', text: '136cm' },            
          { value: '137', text: '137cm' },            
          { value: '138', text: '138cm' },            
          { value: '139', text: '139cm' },            
          { value: '140', text: '140cm' }, 
          { value: '141', text: '141cm' },
          { value: '142', text: '142cm' },
          { value: '143', text: '143cm' },            
          { value: '144', text: '144cm' },           
          { value: '145', text: '145cm' },            
          { value: '146', text: '146cm' },            
          { value: '147', text: '147cm' },            
          { value: '148', text: '148cm' },            
          { value: '149', text: '149cm' },            
          { value: '150', text: '150cm' },
          { value: '151', text: '151cm' },
          { value: '152', text: '152cm' },
          { value: '153', text: '153cm' },            
          { value: '154', text: '154cm' },           
          { value: '155', text: '155cm' },            
          { value: '156', text: '156cm' },            
          { value: '157', text: '157cm' },            
          { value: '158', text: '158cm' },            
          { value: '159', text: '159cm' },            
          { value: '160', text: '160cm' },     
          { value: '161', text: '161cm' },
          { value: '162', text: '162cm' },
          { value: '163', text: '163cm' },            
          { value: '164', text: '164cm' },           
          { value: '165', text: '165cm' },            
          { value: '166', text: '166cm' },            
          { value: '167', text: '167cm' },            
          { value: '168', text: '168cm' },            
          { value: '169', text: '169cm' },            
          { value: '170', text: '170cm' },
          { value: '171', text: '171cm' },
          { value: '172', text: '172cm' },
          { value: '173', text: '173cm' },
          { value: '174', text: '174cm' },
          { value: '175', text: '175cm' },
          { value: '176', text: '176cm' },
          { value: '177', text: '177cm' },
          { value: '178', text: '178cm' },
          { value: '179', text: '179cm' },
          { value: '180', text: '180cm' },   
          { value: '181', text: '181cm' },
          { value: '182', text: '182cm' },
          { value: '183', text: '183cm' },
          { value: '184', text: '184cm' },
          { value: '185', text: '185cm' },
          { value: '186', text: '186cm' },
          { value: '187', text: '187cm' },
          { value: '188', text: '188cm' },
          { value: '189', text: '189cm' },
          { value: '190', text: '190cm' },   
          { value: '191', text: '191cm' },
          { value: '192', text: '192cm' },
          { value: '193', text: '193cm' },
          { value: '194', text: '194cm' },
          { value: '195', text: '195cm' },
          { value: '196', text: '196cm' },
          { value: '197', text: '197cm' },
          { value: '198', text: '198cm' },
          { value: '199', text: '199cm' },
          { value: '200', text: '200cm' },     
          { value: '201', text: '201cm' },
          { value: '202', text: '202cm' },
          { value: '203', text: '203cm' },
          { value: '204', text: '204cm' },
          { value: '205', text: '205cm' },
          { value: '206', text: '206cm' },
          { value: '207', text: '207cm' },
          { value: '208', text: '208cm' },
          { value: '209', text: '209cm' },
          { value: '210', text: '210cm' },                                                                        
        ],
        ageOption:[
          { value: '', text: '選擇年紀',disabled: true },
          { value: '0', text: '0歲' },
          { value: '1', text: '1歲' },
          { value: '2', text: '2歲' },
          { value: '3', text: '3歲' },            
          { value: '4', text: '4歲' },           
          { value: '5', text: '5歲' },            
          { value: '6', text: '6歲' },            
          { value: '7', text: '7歲' },            
          { value: '8', text: '8歲' },            
          { value: '9', text: '9歲' },            
          { value: '10', text: '10歲' }, 
          { value: '11', text: '11歲' },
          { value: '12', text: '12歲' },
          { value: '13', text: '13歲' },            
          { value: '14', text: '14歲' },           
          { value: '15', text: '15歲' },            
          { value: '16', text: '16歲' },            
          { value: '17', text: '17歲' },            
          { value: '18', text: '18歲' },            
          { value: '19', text: '19歲' },            
          { value: '20', text: '20歲' },
          { value: '21', text: '21歲' },
          { value: '22', text: '22歲' },
          { value: '23', text: '23歲' },            
          { value: '24', text: '24歲' },           
          { value: '25', text: '25歲' },            
          { value: '26', text: '26歲' },            
          { value: '27', text: '27歲' },            
          { value: '28', text: '28歲' },            
          { value: '29', text: '29歲' },            
          { value: '30', text: '30歲' },     
          { value: '31', text: '31歲' },
          { value: '32', text: '32歲' },
          { value: '33', text: '33歲' },            
          { value: '34', text: '34歲' },           
          { value: '35', text: '35歲' },            
          { value: '36', text: '36歲' },            
          { value: '37', text: '37歲' },            
          { value: '38', text: '38歲' },            
          { value: '39', text: '39歲' },            
          { value: '40', text: '40歲' },
          { value: '41', text: '41歲' },
          { value: '42', text: '42歲' },
          { value: '43', text: '43歲' },
          { value: '44', text: '44歲' },
          { value: '45', text: '45歲' },
          { value: '46', text: '46歲' },
          { value: '47', text: '47歲' },
          { value: '48', text: '48歲' },
          { value: '49', text: '49歲' },
          { value: '50', text: '50歲' },   
          { value: '51', text: '51歲' },
          { value: '52', text: '52歲' },
          { value: '53', text: '53歲' },
          { value: '54', text: '54歲' },
          { value: '55', text: '55歲' },
          { value: '56', text: '56歲' },
          { value: '57', text: '57歲' },
          { value: '58', text: '58歲' },
          { value: '59', text: '59歲' },
          { value: '60', text: '60歲' },   
          { value: '61', text: '61歲' },
          { value: '62', text: '62歲' },
          { value: '63', text: '63歲' },
          { value: '64', text: '64歲' },
          { value: '65', text: '65歲' },
          { value: '66', text: '66歲' },
          { value: '67', text: '67歲' },
          { value: '68', text: '68歲' },
          { value: '69', text: '69歲' },
          { value: '70', text: '70歲' },     
          { value: '71', text: '71歲' },
          { value: '72', text: '72歲' },
          { value: '73', text: '73歲' },
          { value: '74', text: '74歲' },
          { value: '75', text: '75歲' },
          { value: '76', text: '76歲' },
          { value: '77', text: '77歲' },
          { value: '78', text: '78歲' },
          { value: '79', text: '79歲' },
          { value: '80', text: '80歲' },     
          { value: '81', text: '81歲' },
          { value: '82', text: '82歲' },
          { value: '83', text: '83歲' },
          { value: '84', text: '84歲' },
          { value: '85', text: '85歲' },
          { value: '86', text: '86歲' },
          { value: '87', text: '87歲' },
          { value: '88', text: '88歲' },
          { value: '89', text: '89歲' },
          { value: '90', text: '90歲' },  
          { value: '91', text: '91歲' },
          { value: '92', text: '92歲' },
          { value: '93', text: '93歲' },
          { value: '94', text: '94歲' },
          { value: '95', text: '95歲' },
          { value: '96', text: '96歲' },
          { value: '97', text: '97歲' },
          { value: '98', text: '98歲' },
          { value: '99', text: '99歲' },
          { value: '100', text: '100歲' },  
          { value: '101', text: '101歲' },
          { value: '102', text: '102歲' },
          { value: '103', text: '103歲' },
          { value: '104', text: '104歲' },
          { value: '105', text: '105歲' },
          { value: '106', text: '106歲' },
          { value: '107', text: '107歲' },
          { value: '108', text: '108歲' },
          { value: '109', text: '109歲' },
          { value: '110', text: '110歲' },  
          { value: '111', text: '111歲' },
          { value: '112', text: '112歲' },
          { value: '113', text: '113歲' },
          { value: '114', text: '114歲' },
          { value: '115', text: '115歲' },
          { value: '116', text: '116歲' },
          { value: '117', text: '117歲' },
          { value: '118', text: '118歲' },
          { value: '119', text: '119歲' },
          { value: '120', text: '120歲' },                                                
        ]                  
    }
  },
  computed:{ 
    isLeft(){ //true dropdown展開向左
      return {
        "is-left": this.isDropLeft
      }
    }     
  },
  methods: {
    closeDrop(){ //關閉dropdown
        this.$emit("closeDrop", 'success');
    },
    async submit(){
      this.$store.state.isLoading = true;  
      const config = {
        headers:{ //Customer header 
          'content-Type':'application/json',
          'Authorization': this.$store.state.userToken
        }
      }

      try {
        let dataForm = { //修改欄位
            userId: this.$store.state.userId,
            age: this.age,
            height: this.height,
            education: this.education,
            bloodType: this.bloodType,
            career: this.career,
            info: this.info,
            male: this.male,
            city:this.city,
            name: this.name
        };

        const post = await this.axios.post('/data/users/update', dataForm,config)
        .then((res) => { 
          if(res.data.code == 1){
            console.log(res);      
            this.$bvToast.toast(`更新成功`, {
              title: '',
              variant:'success',
              autoHideDelay: 1000,
              solid: true,
            })    

            setTimeout(() => {
            //   this.$store.state.isLoading = false;
              this.$emit("update", 'success');
            }, 1500)

          }
          else{ 
            this.$bvToast.toast(res.data.msg, {
              title: '',
              variant:'danger',
              autoHideDelay: 1500,
              solid: true,
            })
            this.$store.state.isLoading = false;             
          }
         })
        .catch((err) => { console.log(err) })
      } catch (err) {
        throw new Error(err);
        this.$bvToast.toast(err, {
          title: '',
          variant:'danger',
          autoHideDelay: 1500,
          solid: true,
        })
        this.$store.state.isLoading = false;                
      }
    }   
  }   
}
</script>

<style>

</style>
