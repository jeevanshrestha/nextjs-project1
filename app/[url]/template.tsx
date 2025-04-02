'use client'
import React from 'react'
import { ApolloProvider } from "@apollo/client";
import {getClient} from '../server/connection'

const Template = ({children}: {children: React.ReactNode}) => {
    const client = getClient()
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}

export default Template
