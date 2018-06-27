import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, Typography, Button} from "material-ui";
import FirebaseService from "../../service/FirebaseService";
import {Link} from 'react-router-dom';
import {privateUrls} from "../../utils/urlUtils";
import {urls} from "../../utils/urlUtils";

export const DataTable = ({data}) => {
    const remove = (id) => {
        FirebaseService.remove(id, 'leituras');
    };

    return <React.Fragment>
        <Button raised  
                                   component={ props => 
                                 <Link to={urls.add.path} {...props}/>
                                   }
                            >Adicionar</Button>
        <Table selectable={false}>
            <TableHead>
                <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map((item, index) =>
                        <TableRow key={index}>
                            <TableCell>{item.key}</TableCell>
                            <TableCell>
                                {item.nome}
                            </TableCell>
                            <TableCell>{item.descricao}</TableCell>
                            <TableCell>
                                <Button component={props => 
                                    <Link to={privateUrls.mostrar.pathWithouParam + item.key}    
                                            {...props}/>}>
                                        Mostrar
                                </Button>
                                <Button component={props => 
                                    <Link to={privateUrls.edit.pathWithouParam + item.key}    
                                            {...props}/>}>
                                        Edit
                                </Button>
                                <Button
                                   onClick={() => remove(item.key)}>
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    </React.Fragment>
};