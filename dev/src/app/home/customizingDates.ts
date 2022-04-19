export class CustomizingDate {
    constructor(){}
    public UseDate(dateTime : any){
        var date=dateTime.split(" ");
        var time=date[1]; 
        date=date[0].split("-");  
        time=time.split(":");
        const today =new Date(); 
        var day= today.getDate()
        var month=today.getMonth()+1; 
        var year=today.getFullYear();
        var minute=today.getMinutes(); 
        var hour=today.getHours();
        const yearCalculateMessage=Number(date[0])+Number(date[1])/12
        const yearCalculateSys=year+month/12
        const monthCalculateMessage=Number(date[0])*12+Number(date[1])+Number(date[2])/30
        const monthCalculateSys=year*12+month+day/30
        const daysCalculateMessage=Number(date[0])*12*30+Number(date[1])*30+Number(date[2])+Number(time[0])/24
        const daysCalculateSys=year*12*30+month*30+day+(hour/24)
        const hoursCalculateMessage=Number(date[0])*12*30*24+Number(date[1])*30*24+Number(date[2])*24+Number(time[0])+(Number(time[1])/60)
        const hoursCalculateSys=year*12*30*24+month*30*24+day*24+hour+(minute/60)
        const minutesCalculateMessage=Number(date[0])*12*30*24*60+Number(date[1])*30*24*60+date[2]*24*60+Number(time[0])*60+Number(time[1])
        const minutesCalculateSys=year*12*30*24*60+month*30*24*60+day*24*60+hour*60+minute
        if(parseInt((yearCalculateSys-yearCalculateMessage).toString())>0)
        {
            return parseInt((yearCalculateSys-yearCalculateMessage).toString())+" years ago";
        }
        else if(parseInt((monthCalculateSys-monthCalculateMessage).toString())>0)
        {
            return (parseInt((monthCalculateSys-monthCalculateMessage).toString()))+" months ago";
        }
        else if(parseInt((daysCalculateSys-daysCalculateMessage).toString())>0)
        {
            return parseInt((daysCalculateSys-daysCalculateMessage).toString())+" days ago";
        }
        else if(parseInt((hoursCalculateSys-hoursCalculateMessage).toString())>0)
        {
            return parseInt((hoursCalculateSys-hoursCalculateMessage).toString())+" hours ago";
        }
        else if(parseInt((minutesCalculateSys-minutesCalculateMessage).toString())>0)
        {
            return parseInt((minutesCalculateSys-minutesCalculateMessage).toString())+" minutes ago";
        }
        else 
        {
            return "Now";
        }
    }
}