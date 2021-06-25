export const errorAlert = (error:any) => {
    if (error.response){
        alert(error.response.data.message);
    }else {
        alert("ERROR !!!");
    }
}
