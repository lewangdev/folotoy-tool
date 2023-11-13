<template>
    <div style="display: flex;justify-content: flex-start;">
        <div style="line-height: 50px;margin-right: 4px;">
            <PlayCircleOutlined v-if="!isPlaying" @click="handlePlayPause" />
            <PauseCircleOutlined v-else @click="handlePlayPause" />
        </div>

        <div ref="waveformRef" style=" width: 80%;"></div>
    </div>
</template>
  
<script >
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons-vue';

import WaveSurfer from 'wavesurfer.js';

export default {
    name: 'voiceComponent',
    components: {
        PlayCircleOutlined,
        PauseCircleOutlined,
    },
    props: {
        src: String,
    },
    setup(props) {
        const waveformRef = ref(null);
        const wavesurfer = ref(null);
        const isPlaying = ref(false);

        onMounted(() => {
            wavesurfer.value = WaveSurfer.create({
                container: waveformRef.value,
                barWidth: 2,
                cursorWidth: 0,
                barRadius: 3,
                height: 50,
                barGap: 3,
                waveColor: '#D9D9D9',
                progressColor: '#4A7CFF',
                responsive: true,
            });

            wavesurfer.value.load(props.src);


            wavesurfer.value.on('finish', function () {
                isPlaying.value = false;
                wavesurfer.value.seekTo(0);
                window.audioPlayingStopp = null
            });
        });
        const stop= () => {
            wavesurfer.value.stop()
            isPlaying.value = false;
        }
        onBeforeUnmount(() => {
            wavesurfer.value.destroy();
        });

        const handlePlayPause = () => {
            isPlaying.value = !isPlaying.value;
            wavesurfer.value.playPause();
            if (isPlaying.value) {
                //检测当前是否有播放
                if (window.audioPlayingStopp) {
                    window.audioPlayingStopp()
                }
                window.audioPlayingStopp = stop
            } else {
                window.audioPlayingStopp = null
            }
        };

        return {
            waveformRef,
            isPlaying,
            handlePlayPause,
        };
    },
};
</script>
  