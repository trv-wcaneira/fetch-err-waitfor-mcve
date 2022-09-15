# fetch-err-waitfor-mcve
This is _another_ quick MCVE (Minimal, Complete, Verifiable example) to demonstrate what I think could be a bug/unexpected behavior in either React 18 or RTL 13.4.  OTOH, it could just be that I'm doing it wrong<sup>TM</sup>. :-)

## Background

When we upgraded to React 18 and RTL 13.4, a number of existing tests started to fail assertions.  The common denominator between these tests is that they involved:

1. a fetch error, 
1. rendering of an error message component, 
1. a function call* in a useEffect of the error message component that does some logging of the error detail.  

* This logging function was returned from a custom hook, but in my testing the hook isn't essential to the test.  A function simply imported from another module is sufficient to demo this.

The failing assertion is expecting the logging function call to be made.  It will only pass consistently if it is wrapped in `waitFor`.

I plan to open an issue (question) with the RTL maintainers so I understand why we see this behavior.

## How to use this repo
After `npm i`, use `npm t` to run the tests in watch mode, and see the error.  It will look something like

```console
    expect(jest.fn()).toHaveBeenCalledWith(...expected)

    Expected: "kaboom!"

    Number of calls: 0
```

**The error occurs almost randomly**, so please hit "enter" in watch mode several times if you don't see it right away.  There are two tests you can try, one that generates the error, and one that does NOT.  The only difference is the use of `waitFor` on passing test.  

If you prefer, you can use `npm run test:nowatch`.  

Using `npm start` will open the test application in a browser to see it visually, if desired.  

## Warning
The API endpoint this uses will occasionally have CORS errors, when testing in a browser.  I wonder if the API owner is load balancing servers and one of them doesn't allow CORS.  Simply keep trying if you get such an error.