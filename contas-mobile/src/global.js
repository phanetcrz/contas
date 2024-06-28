const MesAno = () =>{
    var data = new Date(),

    mes  = (data.getMonth()+1).toString().padStart(2, '0'), 
    ano  = data.getFullYear();
    
    return mes+"/"+ano;
}

export default {MesAno};