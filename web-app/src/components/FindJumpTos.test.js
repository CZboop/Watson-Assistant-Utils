import React from 'react';
import {createRoot} from 'react-dom/client';
import {act, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import user from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FindIntentNode from './FindIntentNode';
import {screen} from '@testing-library/react';
import { cleanup } from '@testing-library/react'



// TODO: THINGS TO TEST/WHAT COULD TEST
// SWITCH BETWEEN INTENT AND NODE
// FIND BOTH INTENT AND NODE JUMP-TOS
// ALERT IF NO SELECTION FOR BOTH NODE AND INTENT (COULD TEST MESSAGE IS DIFFERENT/CORRECT TOO)
// NOTHING JUMPING TO CREATES ALERT - BOTH NODE AND INTENT
// INVALID INPUT GIVES ALERT ERROR (CURRENTLY GIVES AS IF JUST NOTHING JUMPING TO IT, ADJUST THIS TO SAY INVALID INPUT?!)
// SWITCH THE SELECTED AFTER GETTING RESULTS
