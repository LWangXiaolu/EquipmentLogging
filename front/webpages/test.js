function getUser(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('reading a user from a database');
            resolve({id:id, gitHubUsername:'Lucy'});
        },2000);
    })
    }
function getRepositories(username){
        setTimeout(()=>{
            console.log(username);
            return (['repo1','repo2','repo3']);
        },2000);
}
function getCommits(repo){
        setTimeout(()=>{
            // console.log(repo[0]);
            return(repo)}, 2000);
}
// getUser(1)
//     .then(user=>getRepositories(user.gitHubUsername))
//     .then(repo=>getCommits(repo[0]))
//     .then(commits=>console.log(commits))
//     .catch(err=>{console.log(err.message)});
async function displayCommits(){
    try{
const user=await getUser(1);
console.log(user);
}
catch(err){
    console.log(err);
}
}
displayCommits();
// const repo=await getRepositories(user.gitHubUsername);
// const commit=await getCommits(repo[0]);



// function getRepositories(user){
//     console.log(user);
//     //get the repo using the username parameter
//     getRepositories(user.gitHubUsername, displayRepo(array));
// }

// function displayRepo(array){
//         console.log(array)}

// const p=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         // resolve(1);
//         reject(new Error('message'))
//     },2000);
// });
// p
//     .then(result=>{console.log(result)})
//     .catch(err=>{console.log(err.message)});

// const p1=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve(1);
//     },3000)
// });
// const p2=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve(2);
//     },2000)
// });

// Promise.race([p1,p2]).then(result=>console.log(result));
