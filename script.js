document.addEventListener("DOMContentLoaded",function(){
    const searchbtn = document.getElementById("search-btn");
    const usernameinput = document.getElementById("username");
    const pie1 = document.getElementById("pie1");
    const pie2 = document.getElementById("pie2");
    const pie3 = document.getElementById("pie3");
    const stat1 = document.getElementsByClassName("stat1");
    const stat2 = document.getElementsByClassName("stat2");
    const stat3 = document.getElementsByClassName("stat3");
    const piechart1 = document.getElementById("piechart1");
    const piechart2 = document.getElementById("piechart2");
    const piechart3 = document.getElementById("piechart3");
    const statcontainer = document.getElementById("stat");

    let validate = (username) => {
        if(username.trim() === ""){
            alert("username should not be empty") ;
            return false ;
        }
        let regex = /^[a-zA-Z0-9_-]{4,15}$/ ;
        let ismatching = regex.test(username) ;
        if(!ismatching){
            alert("not a valid username") ;
        }
        return ismatching ;
    }
    function updateprogress(total , solved , pie , piechart){
        const progress = (solved/total)*100 ;
        piechart.style.setProperty("--progress-deg" , `${progress}deg`) ;
        pie.textContent = `${solved} / ${total}`;
     }

    let populatedata = (data) => {
        const total = data.totalQuestions ;
        const totaleasy = data.totalEasy ;
        const totalmedium = data.totalMedium ;
        const totalhard = data.totalHard ;

        const totalsolved = data.totalSolved ;
        const totaleasysolved = data.easySolved ;
        const totalmediumsolved = data.mediumSolved ;
        const totalhardsolved = data.hardSolved ;

        const progress = (totalsolved/total)*100 ;
        // pie1.textContent = totalsolved ;
        // console.log(progress) ;
        // piechart1.style.setProperty("--progress-deg" , `${progress}%`) ;

        updateprogress(totaleasy , totaleasysolved , pie1 , piechart1 ) ;
        updateprogress(totalmedium , totalmediumsolved , pie2 , piechart2  ) ;
        updateprogress(totalhard , totalhardsolved , pie3 , piechart3 ) ;
    }

    async function fetchDetails(username){
        const url = `https://leetcode-stats-api.herokuapp.com/${username}` 
        try{
            searchbtn.textContent = "searching..." ;
            searchbtn.disabled = true ;

            let response = await fetch(url) ;
            if(!response.ok){
                throw new Error(`unable to find username`) ;
            }
            const data = await response.json() ;
            console.log(data) ;

            populatedata(data) ;
        }
        catch(error){
            console.log("hello") ;
            statcontainer.innerHTML = `<p>DATA NOT FOUND</p>` ;
        }
        finally{
            searchbtn.textContent = "search" ;
            searchbtn.disabled = false ;
        }
    }

    searchbtn.addEventListener('click' , function(){
        const username = usernameinput.value ;
        if(validate(username)){
            fetchDetails(username) ;

        } 
    })
})

