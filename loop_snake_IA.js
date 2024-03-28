class LoopSnakeIA{
    constructor(moves_and_moves_count){
        this._moves_and_moves_cnt = moves_and_moves_count;
        this._moves_cnt = 0;
        this._current_move_cnt = 0;
    }

    nextMove(snake){
        let move_and_count = this._moves_and_moves_cnt[this._moves_cnt]
        let count = move_and_count[1];
        if(this._current_move_cnt++ >= count){
            this._current_move_cnt = 0;
            this._moves_cnt++;
            if(this._moves_cnt >= this._moves_and_moves_cnt.length)
                this._moves_cnt = 0;
            return this._moves_and_moves_cnt[this._moves_cnt][0];
        } 
        return move_and_count[0];
    }
}

export {LoopSnakeIA};