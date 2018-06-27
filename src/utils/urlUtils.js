export const urls = {
    //home: { name: 'Home', path:'/'},
    data: { name: 'Data', path:'/'},
    add:  { name: 'Add',  path:'/add'},
    show:  { name: 'Show',  path:'/show'},
};
export const privateUrls = {
    edit: { 
        name: 'Edit',
        path:'/edit/:id',
        pathWithouParam:'/edit/'},

    mostrar: { 
        name: 'Mostrar',
        path:'/mostrar/:id',
        pathWithouParam:'/mostrar/'}
};