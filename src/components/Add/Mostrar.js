
import {TextField, Typography} from "material-ui";
import React, {Component} from "react";
import FirebaseService from "../../service/FirebaseService";
import {firebaseStorage} from '../../utils/firebaseUtils'
import {urls} from "../../utils/urlUtils";
import {withRouter} from "react-router-dom";
//import VisualRecognitionV3 from "watson-developer-cloud/visual-recognition/v3";

let apiKey = "xedOP_dKLHyAMNSQmbjneoCQA96suD7XDEVY9K2be10g"
let version = '2018-03-19'; // use today's date for the most recent version
//let visualRecognition = VisualRecognitionV3(version, apiKey)
/*let visualRecognition = new VisualRecognitionV3({
    version: version,
    iam_apikey: apiKey
});*/


class Add extends Component {

    state = {id: null, nome: '', descricao: '', image: ''};

    componentWillMount = () => {
        const {id} = this.props.match.params;

        if (!(id === undefined || !id)) {
            this.setState({id});
            FirebaseService.getUniqueDataBy('leituras', id, (data) => this.setState({...data}, () =>  {
                console.log(this.state);
                
                let url = this.state.image;
                /*visualRecognition.detectFaces({url: url}, function(err, response) {
                    if (err)
                      console.log(err);
                    else
                      console.log(JSON.stringify(response, null, 2))
                  });*/
            }));

        }

    };


    render = () => {
        return (<React.Fragment>

            <Typography variant="headline" component="h2">{this.state.nome}</Typography>
            <Typography variant="headline" component="h2">{this.state.descricao}</Typography>
            <img src={this.state.image}/>
            
               
        </React.Fragment>)
    }
}

export default withRouter(Add);