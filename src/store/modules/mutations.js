export default{
    changeTest(state, newStr){
        state.testPara = newStr;
    },
    RecordUUID(state, uuid){
        state.uuid = uuid;
    }
}