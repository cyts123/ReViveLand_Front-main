export default{
    TestAction(context, str){
        context.commit("changeTest", str);
    }
}