import React from 'react';

import { Container } from '@mui/system';
import { Typography } from '@mui/material';
import './Index.scss';
import ProContainer from './ProContainer';
import { getPropertyTypes } from '../../libs/api/Api.js';




function Property() {

    const [types, setTypes] = React.useState([]);
    React.useEffect(() => {
        getPropertyTypes({}).then(({ data }) => {
            setTypes(data.data);
        })
    }, [])
    return (
        <div id='page' style={{ margin: "40px auto" }}>
            {
                types.map((type) =>
                    <Container maxWidth='xl'>
                        <Container
                            maxWidth='xl'
                            sx={{
                                background: '#D3DEEE',
                                borderRadius: '5px',
                                border: '1px solid #fffff',
                                margin: '8px 0px 20px 0px',
                                padding: '10px 0px 20px 0px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >

                            <Typography
                                variant='h4'
                                align='center'
                                maxWidth="md"
                                sx={{
                                    backgroundColor: "#E2EDF3",
                                    margin: '0px 20px',
                                    color: '#002B3D',
                                    borderRadius: "30px",
                                    borderBottom: '10px solid #290000',
                                    padding: '6px 30px',
                                }}
                                fullWidth >
                                {type.name}
                            </Typography>
                            <ProContainer  typeId={type._id}/>

                        </Container>
                    </Container>
                )
            }


            {/* <Footer /> */}

        </div>
    )
}

export default Property;
