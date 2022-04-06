var Result = 0,
    Operator = 0,
    Second = 0,
    Ready = 0,
    Done = 1,
    Complete = 0,
    Integer, CurrentValue;
//sdasd
function reset(value) {
    document.calculator.LED.value = value;
    Result = 0, Operator = 0, Second = 0, Ready = 0;
    Done = 1;
    Complete = 0;
}

function SetValue(NewValue) {
    Integer = 1;
    if (Second || Done) {
        Second = 0;
        Done = 0;
        CurrentValue = NewValue;
    }
    for (var i = 0; i < CurrentValue.length; i++)
        if (CurrentValue[i] == '.')
            Integer = 0;
}

function Click(Caption) {
    CurrentValue = document.calculator.LED.value;
    if (Caption == '.') {
        SetValue('0');
        if (Integer) {
            CurrentValue += Caption;
            document.calculator.LED.value = CurrentValue;
            Complete = 0;
        }
    }
    if (Caption.length == 1 && Caption >= '0' && Caption <= '9') {
        SetValue('');
        if (CurrentValue == '0')
            CurrentValue = '';
        CurrentValue += Caption;
        document.calculator.LED.value = CurrentValue;
        Complete = 1;
    }


    if (Caption == '-' || Caption == '+' || Caption == '/' || Caption == '*' || Caption == '^') {
        if (Second)
            Operator = Caption
        else {
            if (!Ready) {
                Operator = Caption;
                Result = CurrentValue;
                Ready = 1;
            } else {
                if (Operator == '^')
                    Result = Math.pow(Result, CurrentValue);
                else
                    Result = eval(Result + Operator + CurrentValue);
                Operator = Caption;
                document.calculator.LED.value = Result;
            }
            Complete = 0;
            Second = 1;
        }
    }

    if (Caption == 'exp') {
        Result = Math.exp(CurrentValue);
        reset(Result);
    }
    if (Caption == 'log') {
        Result = Math.log(CurrentValue) / Math.LN10;
        reset(Result);
    }

    if (Caption == 'sin') {

        Result = Math.sin(CurrentValue);
        reset(Result);
    }
    if (Caption == 'cos') {
        Result = Math.cos(CurrentValue);

        reset(Result);
    }
    if (Caption == 'tan') {
        Result = Math.tan(CurrentValue);

        reset(Result);
    }

}