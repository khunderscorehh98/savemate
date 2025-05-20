import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService {
  static const String _baseUrl = 'http://127.0.0.1:5003/api/auth';

  static Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await http.post(Uri.parse('$_baseUrl/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );
    return {'statusCode': response.statusCode, 'body': jsonDecode(response.body)};
  }

  static Future<Map<String, dynamic>> register(String name, String email, String password) async {
    final response = await http.post(Uri.parse('$_baseUrl/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'name': name, 'email': email, 'password': password}),
    );
    return {'statusCode': response.statusCode, 'body': jsonDecode(response.body)};
  }
}
