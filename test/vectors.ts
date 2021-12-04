describe('base64url testing', function () {
  const vectors = [
    {
      binary: new Uint8Array(),
      base64: '',
      urlsafe: false,
      padding: true
    },
    {
      binary: new Uint8Array([0, 123]),
      base64: 'AHs=',
      urlsafe: false,
      padding: true
    },
    {
      binary: new Uint8Array([0, 123]),
      base64: 'AHs',
      urlsafe: true,
      padding: false
    },
    {
      binary: new Uint8Array([102]),
      base64: 'Zg==',
      urlsafe: false,
      padding: true
    },
    {
      binary: new Uint8Array([0, 123, 192, 255]),
      base64: 'AHvA/w==',
      urlsafe: false,
      padding: true
    },
    {
      binary: new Uint8Array([0, 123, 192, 255]),
      base64: 'AHvA_w',
      urlsafe: true,
      padding: false
    },
    {
      binary: new Uint8Array([102, 111, 111, 98, 97, 114]),
      base64: 'Zm9vYmFy',
      urlsafe: undefined, // defaults to false
      padding: undefined // defaults to true
    },
    {
      binary: new Uint8Array([72, 101, 108, 108, 111]),
      base64: 'SGVsbG8',
      urlsafe: undefined, // defaults to false
      padding: false
    },
    {
      binary: new Uint8Array([254, 1, 128, 255]),
      base64: '_gGA_w',
      urlsafe: true,
      padding: false
    },
    {
      binary: 'fooba',
      base64: 'Zm9vYmE=',
      urlsafe: true,
      padding: undefined // defaults to true
    },
    {
      binary: 'foobar',
      base64: 'Zm9vYmFy',
      urlsafe: false,
      padding: false // defaults to true
    }
  ]
  for (const vector of vectors) {
    describe(`encode([${vector.binary.toString()}])`, function () {
      it(`should return '${vector.base64}'`, function () {
        const ret = _pkg.encode(vector.binary, vector.urlsafe, vector.padding)
        chai.expect(ret).to.equal(vector.base64)
      })
    })
    describe(`decode('${vector.base64}')`, function () {
      it(`should return ${vector.binary.toString()}`, function () {
        const ret = _pkg.decode(vector.base64, typeof vector.binary === 'string' || undefined)
        chai.expect(ret.toString()).to.equal(vector.binary.toString())
      })
    })
  }
})
