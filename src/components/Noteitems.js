import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
const Noteitems = (props) => {

    const context = useContext(noteContext);
    const {deleteNote}=context;
    const { notes,updateNote } = props;
    return (
        <div className='col-4'>
           <div className="card my-3 p-3">
              <div className="d-flex align-items-center">
                    <div className="className"></div>
                    <h5 className="card-title">{notes.title}</h5>
          
                    <i className="fa fa-trash-alt mx-2" onClick={()=>{

                             deleteNote(notes._id);
                             props.showAlert("Successfully Deleted account","success");
                    }}></i>
                    <i className="fa fa-pencil-square-o mx-2 " onClick={()=>{updateNote(notes)}}></i>

                </div>
                <p className="card-text">{notes.description}</p>
            </div>

        
        </div>
    )
}

export default Noteitems
