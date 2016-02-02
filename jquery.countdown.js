(function($) {
    $.fn.countdown = function(options) {
        options = $.extend({}, $.fn.countdown.defaults, options);

        // trim zero
        function trimZero(str) {
            return parseInt(str.replace(/^0/g, ''));
        }

        // convert string to time
        function getDate(str) {
            var m;
            if ((m = /^(\d{4})[^\d]+(\d{1,2})[^\d]+(\d{1,2})\s+(\d{2})[^\d]+(\d{1,2})[^\d]+(\d{1,2})$/.exec(str))) {
                var year = trimZero(m[1]),
                    month = trimZero(m[2]) - 1,
                    day = trimZero(m[3]),
                    hour = trimZero(m[4]),
                    minute = trimZero(m[5]),
                    second = trimZero(m[6]);
                return new Date(year, month, day, hour, minute, second);
            } else {
                return new Date(parseInt(str));
            }
        }

        function getDiff(date) {
            return date.getTime() - new Date().getTime();
        }

        function getDur(diff) {
            var dur = {};
            var secondDiff = Math.floor(diff / 1000);
            dur['d'] = Math.floor(secondDiff / 86400);
            dur['h'] = Math.floor(secondDiff / 3600) % 24;
            dur['m'] = Math.floor(secondDiff / 60) % 60;
            dur['s'] = secondDiff % 60;
            dur['ms'] = diff % 1000;
            return dur;
        }

        function format(tmpl, dur) {
            return tmpl.replace(/%\{d\}/ig, zero(dur.d))
                .replace(/%\{h\}/ig, zero(dur.h))
                .replace(/%\{m\}/ig, zero(dur.m))
                .replace(/%\{s\}/ig, zero(dur.s))
                .replace(/%\{sss\}/ig, msZero(dur.ms));
        }

        function zero(n) {
            if (n > 0) {
                if (n < 10) {
                    n = "0" + n
                }
                return String(n);
            } else {
                return "00";
            }
        }

        function msZero(n) {
            if (n > 0) {
                if (n < 10) {
                    n = "00" + n;
                } else if (n < 100) {
                    n = "0" + n;
                }
                return String(n);
            } else {
                return "00";
            }
        }

        // main
        return this.each(function() {
            var $this = $(this);
            var opts = $.metadata ? $.extend({}, options, $this.metadata()) : options;
            var date_s = getDate($this.attr(opts.attrName_start)),
                date_e = getDate($this.attr(opts.attrName_end));
            

            function update() {
                var diff_s = getDiff(date_s);
                if (diff_s > 0) {
                    $this.html(format(opts.notStart, getDur(diff_s)));
                    if (opts.beforeStart) {
                        opts.beforeStart($this);
                    }
                    setTimeout(function() {
                        update();
                    }, opts.interval);
                    return;
                }
                var diff_e = getDiff(date_e);
                if (diff_e <= 0) {
                    $this.html(opts.end);
                    if (opts.afterEnd) {
                        opts.afterEnd($this);
                    }
                    return;
                }
                if (typeof opts.print == 'function') {
                    return opts.print(getDur(diff_e));
                }
                $this.html(format(opts.tmpl, getDur(diff_e)));
                if (opts.inTime) {
                    opts.inTime($this);
                }
                setTimeout(function() {
                    update();
                }, opts.interval);
            }
            update();
        });
    };
    $.fn.countdown.defaults = {
        attrName_start: 'date_s',
        attrName_end: 'date_e',
        tmpl: '剩余%{d}天%{h}时%{m}分%{s}秒%{sss}毫秒',
        end: '已到期',
        notStart: '即将开始%{d}天%{h}时%{m}分%{s}秒%{sss}毫秒',
        afterEnd: null,
        beforeStart: null,
        inTime: null,
        interval: 10, //精确到秒时，输入1000即可
        print: 0
    }
})(jQuery);
