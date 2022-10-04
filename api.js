const URL = "http://167.71.206.17"
export default async function (request){
    let mode = request.mode;
    if (mode === "cityname"){
        return fetch(`${URL}/${mode}?name=${request.code}`).then(function(response){
            return response.json();
        }).catch(error => {
            return error.json();
        });
    }
    else if (mode === "latlong"){
        return fetch(`${URL}/${mode}?latlong=${request.lat},${request.lon}`).then(function(response){
            return response.json()
        }).catch(error => {
            return error.json();
        });
    }
}