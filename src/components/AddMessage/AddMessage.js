import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

class AddMessage extends Component{
    state = {
        name:'',
        text:'',
        authors:[],
        author:'',
        errorText:'',
        labelWidth:0
    }

    componentDidMount() {
        this.authors();
    }

    handleChange = name => event => {
        if(name==="author"){
            this.setState({
                'name': event.target.value,
            });
        }
        this.setState({
          [name]: event.target.value,
        });
    };

    authors = () => {
        fetch(`http://localhost:8080/message/authors`, {
            method: 'GET',
        }).then(function (response) {
            return response.json();
        })
        .then(data => this.setState({ authors: data }));
    }

    addClick = () => {
        const {name, text} = this.state

        if(name.length < 1){
            this.setState({ errorText: 'Необходимо заполнить поле "Имя"'});
        }else if(text.length < 1){
            this.setState({ errorText: 'Текст записи не можт быть пустым'});
        }else{
            fetch(`http://localhost:8080/message`, {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        text: text, 
                        author: {
                            author: name
                        } 
                    })
                }
            ).then(result => result.json().then(console.log))        
            this.canselClick();
            this.authors();
            this.setState({ errorText: 'Запись добавлена'});        
        }
    }

    canselClick = () => {
        this.setState({ 
            name:'',
            text:'',
            author:''
        })
    }

    render(){
        const {author, authors, name, text, errorText} = this.state
        return(
        <Grid container
            direction="row"
            justify="center"
            alignItems="flex-start">
            <Grid item xs={6}>
                <TextField
                    id="outlined-name"
                    label="Имя"
                    value={name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    variant="outlined"
                />

                <FormControl variant="outlined" style={{margin:"16px"}}>
                {authors.length > 0 ?
                <Select
                    value={author === '' ? authors[0].author : author}
                    onChange={this.handleChange('author')}
                    input={
                    <OutlinedInput
                        labelWidth={this.state.labelWidth}
                        name="author"
                        id="outlined-age-simple"
                    />
                    }
                >
                {authors.map(auth => (
                    <MenuItem value={auth.author} key={auth.author}>{auth.author}</MenuItem>                    
                ))}
                </Select> : null}
                </FormControl>

                <TextField
                    id="outlined-multiline"
                    multiline
                    fullWidth={true}
                    placeholder="Поле ввода текста"
                    margin="normal"
                    row={4}
                    variant="outlined"
                    value={text}
                    onChange={this.handleChange('text')}
                />
                <div>
                <Button variant="contained" color="primary" style={{background: "#db5565"}}                         
                    onClick= {this.canselClick}
                >Отменить
                </Button>
                <Button variant="contained" color="primary" style={{margin:"16px", background: "#51bf87"}}                         
                    onClick= {this.addClick}
                >+
                </Button>
                </div>
                <p>{errorText}</p>
            </Grid>  
        </Grid>
        );
    }
}

export default AddMessage;