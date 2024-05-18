export const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const hour = Math.floor(minutes / 60);
    const remainingSeconds = time % 60;
    return {
        minutes, hour, seconds:remainingSeconds
    };
};