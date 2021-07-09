import { StyleSheet } from "react-native";

export const GlobalStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  SafeAreaView: {
    flex: 1,
  },

  //----- Titles -----
  //Header Home Page(HEHome)
  headerHomePage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 50, 
  },

  fakeIconBox: {
    backgroundColor: '#e4e6eb',
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  //Header Recipes Page(HERecipes)
  headerRecipesPage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 50, 
  },
  //----- End of titles -----

  
  //----- Modal -----
  //Modal Toggle(HEHome)
  modalToggle: {
    marginBottom: 10,
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#e4e6eb',
    padding: 10,
    alignSelf: "flex-end",
  },

  modalContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  //----- End of Modal -----

  //----- TextArea(HEHome) -----
  textAreaContainer: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    borderRadius: 4,
    padding:15,
    margin:10,
  },

  textArea: {
    height: '80%',
    justifyContent: "flex-start",
    textAlignVertical: 'bottom',
  },
  //----- End of TextArea -----

  //----- TextInput(HEHome) -----
  inputRecipe: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    borderRadius: 4,
    padding:15,
    margin:10,
  },
  //----- End of TextInput -----

  //----- Button Confirm(HEHome) -----
  btnEffect: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  
  BtnNext: {
    width: 350,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#3b579d",
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#3b579d',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    marginBottom: 250,
    padding: 20,
  },
  //----- End of Button -----

  //----- togetherAction(HEHome) -----
  togetherAction: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  imgRecipe: {
    width: 100,
    height: 100,
    backgroundColor: "#f2709c",
    borderRadius: 10,
    marginRight: 10,
  },
  //----- End of togetherAction -----

  HeadText: {
    marginTop:40,
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: 'left', alignSelf: 'stretch'
    ,paddingLeft:40
  },
  input:{
    alignSelf:"center",
    borderColor:'#777',
    padding:15,
    margin:10,
    width:300,
    textAlign:"left",
    borderRadius: 4,
    borderWidth: 1
  },
  appButtonContainer: {
    width:300,
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    padding :50,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  box:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height:"100%",
    width:"100%",
  },
  HeadTextRegister:{
    fontStyle: "italic",
    fontSize: 20,
    textAlign: "center",
  },
  IconInputContainer:{
    flexDirection:'row',
    borderColor:"black",
    borderWidth:1, 
    alignSelf:"center",
    borderColor:'#777',
    margin:10,
    width:300,
    textAlign:"left",
    borderRadius: 4,
    borderWidth: 1
    
  },  inputIcon:{
    alignSelf:"center",
    borderColor:'#777',
  padding:15,

    width:300,
    textAlign:"left",
    borderRadius: 4,

  },
  icon:{
    paddingTop:20
    ,paddingLeft:10,
     fontSize:20
    },textWithLink:{
      flexDirection:'row',
      alignSelf:"center",
      margin:10,
      textAlign:"left",
    }

});
