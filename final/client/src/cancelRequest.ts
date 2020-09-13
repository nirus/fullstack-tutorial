import {
    ApolloLink,
    Observable
} from '@apollo/client';


const connections: { [key: string]: any } = {};

export const cancelRequestLink = new ApolloLink(
    (operation, forward) =>
        new Observable(observer => {
            // Set x-CSRF token (not related to abort use case)
            const context = operation.getContext();
            /** Final touch to cleanup */
            
            const connectionHandle = forward(operation).subscribe({
                next: (...arg) => observer.next(...arg),
                error: (...arg) => {
                    cleanUp();
                    observer.error(...arg);
                },
                complete: (...arg) => {
                    cleanUp();
                    observer.complete(...arg)
                }
            });

            const cleanUp = () => {
                connectionHandle?.unsubscribe();
                delete connections[context.requestTrackerId];
            }

            if (context.requestTrackerId) {
                const controller = new AbortController();
                controller.signal.onabort = cleanUp;
                operation.setContext({
                    ...context,
                    fetchOptions: {
                        signal: controller.signal,
                        ...context?.fetchOptions
                    },
                });

                if (connections[context.requestTrackerId]) {
                    // If a controller exists, that means this operation should be aborted.
                    connections[context.requestTrackerId]?.abort(); 
                }

                connections[context.requestTrackerId] = controller;
            }

            return connectionHandle;
        })
);