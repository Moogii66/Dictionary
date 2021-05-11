async onSearch() {
    if (this.state.userWord.length <= 0) {
      this.setState({errorMsg: 'Please specify the word to lookup.'});
      return;
    }

    try {
      this.setState({loading: true});
      let lemmas = await Api.getLemmas(this.state.userWord);
      console.log('Lemmas: ', lemmas);
      if (lemmas.success) {
        let headWord = Helper.carefullyGetValue(
          lemmas,
          [
            'payload',
            'results',
            '0',
            'lexicalEntries',
            '0',
            'inflectionOf',
            '0',
            'id',
          ],
          '',
        );
        console.log('Headword is: ', headWord);
        if (headWord.length > 0) {
          let wordDefinition = await Api.getDefinition(headWord);
          if (wordDefinition.success) {
            this.setState({
              errorMsg: '',
              loading: false,
              definition: wordDefinition.payload,
            });
            console.log('Word Definition: ', wordDefinition.payload);
          } else {
            this.setState({
              errorMsg:
                'Unable to get result from Oxford: ' + wordDefinition.message,
              loading: false,
              definition: null,
            });
          }
        } else {
          this.setState({
            errorMsg: 'Invalid word. Please specify a valid word.',
            loading: false,
            definition: null,
          });
        }
      } else {
        this.setState({
          errorMsg: 'Unable to get result from Oxford: ' + lemmas.message,
          loading: false,
          definition: null,
        });
      }
    } catch (error) {
      console.log('Error: ', error);
      this.setState({
        loading: false,
        errorMsg: error.message,
        definition: null,
      });
    }
  }\