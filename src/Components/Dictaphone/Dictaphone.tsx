import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import GridItem from '../Grid/GridItem';
import GridContainer from '../Grid/GridContainer';
import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';

const Dictaphone = () => {
    const [message, setMessage] = useState<string[]>([]);
    const [messageOut, setMessageOut] = useState<string[]>([]);
    let today = new Date(),
        date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + '  ' + today.getHours() + ':' + today.getMinutes();
    const commands = [
        {
            command: 'reset',
            callback: () => resetTranscript()
        },
        {
            command: 'In',
            callback: () => { setMessage([...message, date]); console.log(message); }
        },
        {
            command: 'Out',
            callback: () => { setMessageOut([...messageOut, date]) }
        },
    ]
    const {
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
        listening,
    } = useSpeechRecognition({ commands });

    useEffect(() => {
        if (finalTranscript !== '') {
            console.log('Got final result:', finalTranscript);
        }
    }, [interimTranscript, finalTranscript]);
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
    }

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
    }
    const listenContinuously = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-GB',
        });
    };
    return (
        <div>
            <div>
                <span>
                    listening:
                    {' '}
                    {listening ? 'on' : 'off'}
                </span>
                <div>
                    <button type="button" onClick={resetTranscript}>Reset</button>
                    <button type="button" onClick={listenContinuously}>Listen</button>
                    <button type="button" onClick={SpeechRecognition.stopListening}>Stop</button>
                </div>
            </div>
            <GridItem>
                <GridContainer>
                    <Card>
                        <CardHeader color="primary">
                            <h4 >Say In or Out</h4>
                        </CardHeader>
                        <CardBody>
                            <table className="table table-borderless table-stripped">
                                <thead className="thead-light">
                                    <tr className="border border-danger">
                                        <th style={{ background: "linear-gradient(60deg, #ab47bc, #8e24aa)", color: "white" }}>In</th>
                                        <th style={{ background: "linear-gradient(60deg, #ab47bc, #8e24aa)", color: "white" }}>Out</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        message.map((key: any) => {
                                            return (
                                                <tr key={key}>
                                                    <td style={{ border: "1px solid #8e24aa" }}>{key}</td>
                                                    <td style={{ border: "1px solid #8e24aa" }}>...</td>
                                                </tr>
                                            );
                                        })

                                    }
                                    {
                                        messageOut.map((key: any) => {
                                            return (
                                                <tr key={key}>
                                                    <td style={{ border: "1px solid #8e24aa" }}>...</td>
                                                    <td style={{ border: "1px solid #8e24aa" }}>{key}</td>
                                                </tr>
                                            );
                                        })
                                    }




                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </GridContainer>
            </GridItem>

            <br />
            <div>
                <span>{transcript}</span>
            </div>
        </div>
    );
};

export default Dictaphone;