export default class Sound{ //load entity with parameters
    constructor({PathOrUrl, AudioSpeed = 1, Volume = 1}){
        this.Audio = new Audio(PathOrUrl)
        this.Audio.playbackRate = AudioSpeed
        this.Audio.volume = Volume
    }

    play(){
        this.Audio.play()
    }

    set Volume(v){
        this.Audio.volume = v
    }

    set Speed(s){
        this.Audio.playbackRate = s
    }

    get Speed(){
        return this.Audio.playbackRate
    }

    get Volume(){
        return this.Audio.volume
    }

}