import {Button, TextField, Typography} from "material-ui";
import React, {Component} from "react";
import FirebaseService from "../../service/FirebaseService";
import {firebaseStorage} from '../../utils/firebaseUtils'
import {urls} from "../../utils/urlUtils";
import {withRouter} from "react-router-dom";

class Add extends Component {

    state = {id: null, nome: '', descricao: '', image: ''};

    componentWillMount = () => {
        const {id} = this.props.match.params;

        if (!(id === undefined || !id)) {
            this.setState({id});
            FirebaseService.getUniqueDataBy('leituras', id, (data) => this.setState({...data}, () => console.log(this.state)));
        }

    };

    submit = (event) => {
        event.preventDefault();

        const {nome} = this.state;
        const {descricao} = this.state;
        const {image} = this.state;

        let objToSubmit = {
            nome,
            descricao,
            image
        };

        if (this.props.match.params.id === undefined) {
            FirebaseService.pushData('leituras', objToSubmit);
        } else {
            FirebaseService.updateData(this.props.match.params.id, 'leituras', objToSubmit)
        }

        this.props.history.push(urls.data.path);

    };

    onFileChange = (event) => {
        var files = event.target.files || event.dataTransfer.files
        if (!files.length) {
          return
        }
        this.createImage(files[0])
    };
    onImage = (image) => {
        var _this = this
        console.log(image.snapshot);
        image.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            _this.setState({
                ['image']: downloadURL,
            });
        });
        
    };
    createImage = (file) =>  {
        var storageRef = firebaseStorage.ref()
        var uploadTask = storageRef.child('images/' + file.name).put(file)
        var _this = this
        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //_this.status = Math.round(progress);
        }, function(error) {
            //_this.error = error;
        }, function () {
            _this.onImage(uploadTask)
        })
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render = () => {
        return (<React.Fragment>

            <Typography variant="headline" component="h2">Add New</Typography>
            <form onSubmit={this.submit}>
                <TextField className="input-field"
                           type="text"
                           value={this.state.nome}
                           label="Nome"
                           required
                           onChange={this.handleChange('nome')}/>

                <TextField className="input-field"
                           type="text"
                           label="Descrição"
                           value={this.state.descricao}
                           required
                           onChange={this.handleChange('descricao')}/>

                <TextField className="input-field"
                           type="file" 
                           multiple="false" 
                           ref="fileInput" 
                           onChange={this.onFileChange}/>
                
                <img src={this.state.image} class="image"/>
                <Button type="submit"
                        style={{marginTop: '20px', display: 'inline-block'}}>
                    Add
                </Button>
            </form>
        </React.Fragment>)
    }
}

export default withRouter(Add);