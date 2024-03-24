

export interface ServerRuntimeConfig {
    maxDuration: number; // Type annotation for maxDuration
}

export default {
    unstable_runtime: {
        // Other configurations...
        maxDuration: 30, // Set your desired maximum duration in seconds (default is 10)
    } as ServerRuntimeConfig,
};